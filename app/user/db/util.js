const defaultIncludedFields = {
  'image.current': 1,
  name: 1,
  user_details: 1,
  city: 1,
  email: 1,
  like_count: 1
};

const requiredFields = {
  password: 0,
  'image.all': 0
};

module.exports = {
  defaultIncludedFields, requiredFields
};
