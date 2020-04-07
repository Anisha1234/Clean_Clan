/**
 * @param {{
 *  saveNewPost: (data: any) => Promise<any>
 *  updatePostData: (postID: string, data: any) => Promise<{id: string}>
 * }} PostDB - post db object
 */
module.exports = (PostDB) => ({
  /**
   * @function: create a new challenge
   * @param {object} data
   */
  createNewChallenge: async (data) => PostDB.saveNewPost({
    ...data,
<<<<<<< HEAD
    post_type: 'Challenge'
=======
    post_type: "Challenge"
>>>>>>> 998de7b... update post component: like and publish services
  }),
  /**
   * @function: create a new solution
   * @param {object} data
   * @param {string} challengeID - challenge post id that this solution responds to
   */
  createNewSolution: async (data, challengeID) => {
    const solutionPost = await PostDB.saveNewPost({
      ...data,
<<<<<<< HEAD
      post_type: 'Solution',
=======
      post_type: "Solution",
>>>>>>> 998de7b... update post component: like and publish services
      challenge: challengeID
    });
    await PostDB.updatePostData(challengeID, {
      solution: solutionPost.id
    });
<<<<<<< HEAD
  }
});
=======
    return;
  }
});
>>>>>>> 998de7b... update post component: like and publish services
