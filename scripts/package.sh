echo ""
echo "Building dollar-plan ..."
npm run build
echo ""

echo "Backing up data files ..."
mkdir tmp
cp -R app/data/ tmp/data/

echo "Clearing app directory ..."
rm -rf app/
mkdir app

echo "Copying files to app directory ..."
cp -R dist/ app/dist/
cp electron.prod.js app/main.js
cp package.json app/package.json
cp -R tmp/data/ app/data/

echo "Deleting temporary files ..."
rm -rf tmp/
echo ""

echo "Done!"
