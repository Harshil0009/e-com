class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for filtering
    const removeFields = ["keyword", "page", "limit"]; // Fixed capitalization

    removeFields.forEach((key) => {
      for (let prop in queryCopy) {
        if (prop.toLowerCase() === key.toLowerCase()) {
          delete queryCopy[prop];
        }
      }
    });

    // Filtering for price and other numerical fields
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // Fixed typo

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this; // Ensures method chaining
  }
}

module.exports = ApiFeatures;