# To run:
# ./share.sh v.0.0.1

git clone $(git remote -v | grep push | cut -f2 | cut -d ' ' -f1) --branch gh-pages shares

node build --production

mkdir -p ./shares/$1
cp -r ./builds/web/* ./shares/$1

git --git-dir=./shares/.git --work-tree=./shares config user.email "$(git config user.email)"
git --git-dir=./shares/.git --work-tree=./shares config user.name "$(git config user.name)"

git --git-dir=./shares/.git --work-tree=./shares add $1
git --git-dir=./shares/.git --work-tree=./shares commit -m "Pushed $1"
git --git-dir=./shares/.git --work-tree=./shares push origin gh-pages

rm -rf shares

REPO="$(git remote -v | grep push | cut -f2 | cut -d ' ' -f1 | cut -d ':' -f2)"

echo
echo Share your build by going to:
echo https://$(echo $REPO | cut -d '/' -f1).github.io/$(echo $REPO | cut -d '/' -f2 | cut -d '.' -f1)/$1
echo
