module.exports = {
  hooks: {
    'pre-push': 'yarn test',
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint --edit $HUSKY_GIT_PARAMS',
  },
};
