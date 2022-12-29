const exclude = ['sort', 'page', 'fields', 'limit'];
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  add$(object) {
    let str = JSON.stringify(object);
    str = str.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    return JSON.parse(str);
  }

  filter() {
    let queryObj = { ...this.queryString };
    exclude.forEach((ele) => delete queryObj[ele]);
    queryObj = this.add$(queryObj);
    this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortedBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortedBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }
  selection() {
    if (this.queryString.fields) {
      const selectededBy = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectededBy);
    }
    return this;
  }
  Pagination() {
    const pagination = 10;
    if (this.queryString.page) {
      let page = this.queryString.page - 1;
      let limit = this.queryString.limit || pagination;
      this.query = this.query.skip(page * limit).limit(limit);
    } else {
      this.query = this.query.limit(this.queryString.limit || pagination);
    }
    return this;
  }
}
module.exports = APIFeatures;
