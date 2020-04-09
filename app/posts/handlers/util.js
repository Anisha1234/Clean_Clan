/**
 * @function getAuthors - from array of posts, get [userid: userdata] for authors
 * @param {{
  *  getUserProfile : (userID: string, fields?: string[]) => Promise<any>
  * }} UserService: user service
  * @param {{author: string}[]} posts - array of posts
  */
const getAuthors = async (UserService, posts) => {
  const authors = {};
  await Promise.all(
    posts.map(async ({ author }) => {
      if (authors[author]) return;
      const {
        name,
        image: { current: image }
      } = await UserService.getUserProfile(author, ['name', 'image']);
      authors[author] = {
        id: author,
        name,
        image
      };
    })
  );
  return authors;
};

module.exports = {
  getAuthors
};
