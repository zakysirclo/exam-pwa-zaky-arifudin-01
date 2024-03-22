#!/bin/bash

GIT_URL="https://github.com/icube-mage/swift-pwa-demo.git"
PROJECT_NAME="swift-pwa-demo"

function resetRoot() {
    rm -rf src/* pages/* public/* patches/*
    rm -rf .env
    rm project_patch.sh
    git checkout src/* pages/* public/* patches/* swift.config.js
    git clean -f
}

function sync() {
    resetRoot
    cp -rf project/$PROJECT_NAME/src/* src/
    cp -rf project/$PROJECT_NAME/pages/* pages/
    cp -rf project/$PROJECT_NAME/public/* public/
    cp -rf project/$PROJECT_NAME/patches/* patches/
    cp -rf project/$PROJECT_NAME/swift.config.js .
    cp -rf project/$PROJECT_NAME/project_patch.sh .
    cp -rf project/$PROJECT_NAME/.env .
}

function applyPatch() {
    cp -rf project/$PROJECT_NAME/src/* src/
    cp -rf project/$PROJECT_NAME/pages/* pages/
    cp -rf project/$PROJECT_NAME/public/* public/
    cp -rf project/$PROJECT_NAME/patches/* patches/
    cp -rf project/$PROJECT_NAME/swift.config.js .
    cp -rf project/$PROJECT_NAME/project_patch.sh .
    cp -rf project/$PROJECT_NAME/.env .
}

while true; do
case "$1" in
    # -i|--install
	-i|--install) MSG='Install Project '$GIT_URL; shift
	    echo "$MSG"

        # install project repo
        mkdir -p project
        git clone $GIT_URL project/$PROJECT_NAME
        
        # sync
        sync

        #apply patch
        applyPatch
        ;;

    # -u|--uninstall
	-u|--uninstall) MSG='Uninstall Project '$PROJECT_NAME; shift
	    echo "$MSG"
        
        # reset root pwa repo
        resetRoot

        # uninstall project repo
        rm -rf project
        ;;

     # -s|--sync
	-s|--sync) MSG='Sync Project Files '$2; shift
	    echo "$MSG"
        sync
        ;;
    
    # -p|--patch
	-p|--patch) MSG='Apply patches '$2; shift
	    echo "$MSG"
        applyPatch
        ;;
    
    # --help
	-h|--help) shift
		printf "\n"
		printf "Example usage:\n\n"
		printf "Install Project:\n"
		printf "  bash project.sh -i|--info [project git repo url] [project name]\n"
        printf "  Your project will be stored in project/[project name]\n\n"
		printf "Sync Files:\n"
		printf "  bash project.sh -s|--sync\n"
		printf "  Use this command to sync/apply every changes on your project\n\n"
		exit 0 ;;
    --) shift; break ;;
    *) echo "Try -h for example usage."; exit 1 ;;
esac
done