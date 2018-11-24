function StudentInfo(s_id,s_pwd,s_name,s_birthday,s_nation,c_id,s_address,s_sex,isDel) {
    this.s_id=s_id;
    this.s_pwd=s_pwd;
    this.s_name=s_name;
    this.s_birthday=s_birthday;
    this.s_nation=s_nation;
    this.c_id=c_id;
    this.s_address=s_address;
    this.s_sex=s_sex;
    this.isDel=isDel;
}

module.exports=StudentInfo;