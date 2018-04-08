echo ""
echo "Building dollar-plan ..."
npm run build
echo ""

echo "Clearing app directory ..."
rm -rf app/
mkdir app
echo ""

echo "Copying files to app directory ..."
cp -R dist/ app/dist/
cp electron.prod.js app/main.js
cp package.json app/package.json
echo ""
echo "Done!"
