npx husky add .husky/prepare-commit-msg  'exec < /dev/tty && node_modules/.bin/cz --hook || true'