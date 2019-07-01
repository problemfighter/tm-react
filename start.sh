PROJECT_NAME="tm-react"
echo "Welcome to TM React Project";
echo "-------------------------------------------------------------"
echo "-------------------------------------------------------------"

echo "Cloning Root Project From GitHub";
if [ -d "$PROJECT_NAME" ]; then
  rm -rf "$PROJECT_NAME"
fi
git clone https://github.com/hmtmcse/tm-react.git


cd "$PROJECT_NAME"
echo "Cloning Project Wiki From GitHub";
if [ -d "tm-react.wiki" ]; then
  rm -rf tm-react.wiki
fi
git clone https://github.com/hmtmcse/tm-react.wiki.git

echo "Coping Samples";
if [ -d "src/app" ]; then
  rm -rf src/app
fi

if [ -d "./sample/basic" ]; then
      cp -a ./sample/basic src/app
  else
      echo "Unable to Setup Project";
      exit 1
fi

echo "Installing yarn";
npm install -g yarn

echo "Installing Dependency";
yarn install