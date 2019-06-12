# if secondary backup folder exists, delete it
if [ -d ./build_backup_2* ]; then rm -rf build_backup_2*; fi

# if primary backup folder exists, convert it into secondary
if [ -d ./*build_backup_1* ]; then
    primary_backup_folder=$(ls -d build_backup_1* | head -1);
    echo $primary_backup_folder;
    replacement_string="2";
    secondary_backup_folder=${primary_backup_folder/1/$replacement_string};
    echo $secondary_backup_folder;
    mv $primary_backup_folder $secondary_backup_folder;
fi

# convert production build folder to primary backup folder
production_folder="build"
current_datetime=$(date +%Y%m%d)
primary_backup_folder="build_backup_1_$current_datetime"
cp -r $production_folder $primary_backup_folder
rm -rf $production_folder/*
