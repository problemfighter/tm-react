echo "Welcome to TM React Project";
echo "-------------------------------------------------------------"
echo "-------------------------------------------------------------"
echo "Cloning Root Project From GitHub";
git clone https://github.com/hmtmcse/tm-react.git
cd 
echo "Cloning Project Wiki From GitHub";
git clone https://github.com/hmtmcse/tm-react.wiki.git

echo "Coping Samples";
if [ -d "app" ]; then
  rm -rf app
fi

if [ -d "./../sample/basic" ]; then
      cp -a ./../sample/basic app
  else
      echo "Unable to Setup Project";
      exit 1
fi

cd ..
echo "Installing yarn";
npm install -g yarn

echo "Installing Dependency";
yarn install