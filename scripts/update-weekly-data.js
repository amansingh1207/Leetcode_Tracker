// Weekly progress data update script

// Read and parse the CSV data
const csvData = `Name,LeetCode Username,LeetcodeProfileLink,WEEK1,WEEK2,WEEK3,WEEK4
Aaditya Raj,aadi2532,https://leetcode.com/u/aadi2532/,27,32,39,39
Abhishek Singh,Abhishek_2008,https://leetcode.com/u/Abhishek_2008/,11,25,40,64
Aditya,Aadi_Singh_28,https://leetcode.com/u/Aadi_Singh_28/,0,13,28,58
Ajit Yadav,Ajit_Yadav_2908,https://leetcode.com/u/Ajit_Yadav_2908/,6,21,36,62
Akanksha,Akanksha_kushwaha_a,https://leetcode.com/u/Akanksha_kushwaha_a/,22,29,48,72
Alok Raj,alok-work23,https://leetcode.com/u/alok-work23/,3,9,29,53
Aman Verma,aman1640,https://leetcode.com/u/aman1640/,0,4,15,15
Aman Singh ,Aman_Singh_Sitare,https://leetcode.com/u/Aman_Singh_Sitare/,123,140,176,217
Aman Adarsh,amanadarsh1168,https://leetcode.com/u/amanadarsh1168/,0,9,26,52
Amit Kumar,Amit_Kumar13,https://leetcode.com/u/Amit_Kumar13/,3,16,31,54
Anamika Kumari,tanamika,https://leetcode.com/u/tanamika/,4,17,42,42
Anand Singh,of0DUuvBjV,https://leetcode.com/u/of0DUuvBjV/,0,0,2,12
Anand Kumar Pandey,Anand_Pandey123,Anand_Pandey123 - LeetCode Profile,110,139,175,218
Anoop kumar,Anoop_kumar123,https://leetcode.com/u/Anoop_kumar123/,0,8,16,53
Anshu Kumar,CodebyAnshu03,https://leetcode.com/u/CodebyAnshu03/,4,11,19,40
Anuradha Tiwari,anuradha_24,anuradha_24 - LeetCode Profile,52,61,94,122
Anushri Mishra,Anushri_Mishra,https://leetcode.com/u/Anushri_Mishra/,49,53,75,90
Aradhya patel,aradhya789,https://leetcode.com/u/aradhya789/,8,20,40,50
Arjun Kadam,arjunkadampatil,https://leetcode.com/u/arjunkadampatil/,22,57,78,112
Arpita Tripathi,Uny60jPJeO,https://leetcode.com/u/Uny60jPJeO/,42,53,74,91
Arun kumar,Arun_404,https://leetcode.com/u/Arun_404/,0,5,12,41
Aryan Saini,aryan8773,https://leetcode.com/u/aryan8773/,15,31,57,120
Ashwin yadav,ashwin-tech,https://leetcode.com/u/ashwin-tech/,0,5,25,49
Ayush Kumar,Ayush4Sony,https://leetcode.com/u/Ayush4Sony,0,5,16,41
Ayush Kumar Yadav,Ayush_Yadav_029,https://leetcode.com/u/Ayush_Yadav_029/,9,26,42,54
Bhagwati,Bhagwati323,https://leetcode.com/u/Bhagwati323/,5,27,63,98
Bhaskar Mahato,bhaskarmahato03,https://leetcode.com/u/bhaskarmahato03/,1,11,27,52
Byagari Praveen Kumar ,Mr_bpk_4433,https://leetcode.com/u/Mr_bpk_4433/,0,9,24,44
Challa Trivedh Kumar,TrivedhChalla,https://leetcode.com/u/TrivedhChalla/,27,41,61,87
Chandan Giri,WelcomeGseries,https://leetcode.com/u/WelcomeGseries/,12,16,31,47
Chiranjeet Biswas,Chiranjeet_Biswas,https://leetcode.com/u/Chiranjeet_Biswas/,4,5,24,60
Debangsu Misra ,debangsumisra,https://leetcode.com/u/debangsumisra/,18,25,40,65
Deepak Mandal,AlgoMandal,https://leetcode.com/u/AlgoMandal/,0,0,0,0
Dilip Vaishnav ,Dilip_Vaishnav_07,https://leetcode.com/u/Dilip_Vaishnav_07/,4,8,21,56
Dilip Suthar,Dilip0552,https://leetcode.com/u/Dilip0552/,5,15,25,49
Disha Sahu,Disha-01-alt,https://leetcode.com/u/Disha-01-alt/,30,48,68,94
Divyanshi Sahu,ADHIINSVY13,https://leetcode.com/u/ADHIINSVY13/,0,8,22,54
Divyanshi Rathour,Divyanshirathour,https://leetcode.com/u/Divyanshirathour/,15,21,42,62
Ekta kumari,EktaSaw1212,https://leetcode.com/u/EktaSaw1212/,20,25,48,63
Gaurav Rathore,Gaurav_rathore96,https://leetcode.com/u/Gaurav_rathore96/,25,35,62,87
Gaurav kumar,gaurav_vvv,https://leetcode.com/u/gaurav_vvv/,12,14,20,51
Gaurav Tiwari,gauravtiwari_70,https://leetcode.com/u/gauravtiwari_70/,5,10,20,33
Guman Singh Rajpoot,Guman_singh_rajpoot,https://leetcode.com/u/Guman_singh_rajpoot/,8,16,52,97
Harisingh Rajpoot,HarisinghRaj,https://leetcode.com/u/HarisinghRaj/,5,25,54,98
Harsh Chourasiya,harshchourasiya295,https://leetcode.com/u/harshchourasiya295/,1,30,55,120
Harshit Chaturvedi,thisharshit,https://leetcode.com/u/thisharshit/,2,18,30,65
Himanshu kumar,ansraaz86,https://leetcode.com/u/ansraaz86/,1,14,20,55
Himanshu Srivastav,codeCrafter777,https://leetcode.com/u/codeCrafter777/,33,56,71,167
Himanshu Kanwar Chundawat,himanshu_chundawat,https://leetcode.com/u/himanshu_chundawat/,16,23,28,67
Hirak Nath,hirak__,https://leetcode.com/u/hirak__/,12,21,51,78
Hiranya Patil,hiranya_patil,https://leetcode.com/u/hiranya_patil/,7,18,49,75
Ishant Bhoyar,Ishant_57,https://leetcode.com/u/Ishant_57/,38,85,121,143
Jagriti Pandey,jagriti_Pandey01,https://leetcode.com/u/jagriti_Pandey01/,1,5,15,22
Jamal Akhtar,kKJ7y7Q9Ks,https://leetcode.com/u/kKJ7y7Q9Ks/,19,30,40,60
Janu Chaudhary,Janu_Chaudhary,https://leetcode.com/u/Janu_Chaudhary/,41,67,89,124
KARANPAL SINGH RANAWAT,krtechie,https://leetcode.com/u/krtechie/,0,6,41,77
khushi Narwariya,khushi_narwariya,https://leetcode.com/u/khushi_narwariya/,18,29,50,79
Lakhan Rathore,Lakhan_rathore,https://leetcode.com/u/Lakhan_rathore/,0,14,19,41
Maneesh Sakhwar,Maneesh_Sakhwar,https://leetcode.com/u/Maneesh_Sakhwar/,0,4,16,21
Mani Kumar,MANIKUMAR7109,https://leetcode.com/u/MANIKUMAR7109/,9,19,44,57
Manish Chhaba ,Chhaba_Manish,https://leetcode.com/u/Chhaba_Manish/,0,10,21,36
Manish Kumar Tiwari,manish__45,https://leetcode.com/u/manish__45/,156,179,211,262
Manoj Kharkar,manojk909,https://leetcode.com/u/manojk909/,9,21,40,78
Manoj Dewda,Manoj_Dewda022,https://leetcode.com/u/Manoj_Dewda022/,1,14,41,67
Mausam kumari,Mausam-kumari,https://leetcode.com/u/Mausam-kumari/,23,33,68,103
Mayank Raj,mayankRajRay,https://leetcode.com/u/mayankRajRay/,0,7,19,54
Mehtab Alam,alamehtab,https://leetcode.com/u/alamehtab/,9,16,31,63
Mohammad Afzal Raza ,Afzl_Raza,https://leetcode.com/u/Afzal_Raza/,4,17,29,37
MOHD MONIS,codemon-07,https://leetcode.com/u/codemon-07/,15,19,32,50
Mohit Sharma,sharma_Mohit_2005,https://leetcode.com/u/sharma_Mohit_2005/,13,21,37,57
Moirangthem Joel Singh,JoelMoirangthem,https://leetcode.com/u/JoelMoirangthem/,1,10,33,68
Monu Rajpoot,Monurajpoot,https://leetcode.com/u/Monurajpoot/,1,15,40,78
N.Arun Kumar,Arunkumar087,https://leetcode.com/u/Arunkumar087/,4,12,32,53
Neeraj Parmar,Neeru888,https://leetcode.com/u/Neeru888/,30,35,50,70
Nidhi Kumari,Nid_Singh,https://leetcode.com/u/Nid_Singh/,105,120,130,153
NIKHIL Chaurasiya,Rdxnikhil,https://leetcode.com/u/Rdxnikhil/,6,15,21,37
Nikhil Kumar Mehta,Nikhil_KM_04,https://leetcode.com/u/Nikhil_KM_04/,9,41,60,93
Nirmal Kumar,r2GUlBuyLZ,https://leetcode.com/u/r2GUlBuyLZ/,18,27,39,46
Nirmal Mewada,nirmal_M01,https://leetcode.com/u/nirmal_M01/,2,8,11,39
Ompal Yadav,om_codes1,https://leetcode.com/u/om_codes1/,2,2,12,45
Pawan Kushwah ,pawankushwah,https://leetcode.com/u/pawankushwah/,12,26,50,84
Pinky Rana,ranapink398,https://leetcode.com/u/ranapink398/,0,4,14,48
Pooran Singh,pooransingh01,https://leetcode.com/u/pooransingh01/,8,26,35,55
Prabhat Patidar,Prabhat7987,https://leetcode.com/u/Prabhat7987/,29,46,70,73
Prachi Dhakad,prachiDhakad,https://leetcode.com/u/prachiDhakad/,51,79,95,129
Pragati Chauhan,Chauhan_Pragati,https://leetcode.com/u/Chauhan_Pragati/,31,51,87,116
Pranjal Dubey,Pranjal428,https://leetcode.com/u/Pranjal428/,10,20,33,53
Prem Kumar,prem2450,https://leetcode.com/u/prem2450/,6,21,41,59
Prem Shankar Kushwaha,PCodex9,https://leetcode.com/u/PCodex9/,2,11,25,57
Prerana Rajnag,preranarajnag,https://leetcode.com/u/preranarajnag/,1,10,31,51
Priya Saini,Priya_saini2004,https://leetcode.com/u/Priya_saini2004,30,45,83,118
Priyadarshi Kumar,iPriyadarshi,https://leetcode.com/u/iPriyadarshi/,78,87,122,142
Pushpraj singh,Pushpraj_DSA,https://leetcode.com/u/Pushpraj_DSA/,0,10,26,57
Rahul Kumar,rahu48,rahu48 - LeetCode Profile,0,16,24,59
Rahul Kumar Verma,RahulVermaji,https://leetcode.com/u/RahulVermaji/,7,23,43,43
Rajeev Yadav,kn1gh7t,https://leetcode.com/u/kn1gh7t/,7,10,32,62
Rajiv Kumar,rajiv1478,https://leetcode.com/u/rajiv1478/,10,16,26,61
Rakshita K Biradar,RakshitaKBiradar,https://leetcode.com/u/RakshitaKBiradar/,3,8,24,74
Ramraj Nagar,Ramrajnagar,https://leetcode.com/u/Ramrajnagar/,37,48,85,109
Rani Kumari,123_Rani,https://leetcode.com/u/123_Rani/,110,130,168,207
Ranjeet kumar yadav,DL6FbStsPL,https://leetcode.com/u/DL6FbStsPL/,3,8,23,40
Ravi Mourya,MouryaRavi,https://leetcode.com/u/MouryaRavi/,0,14,21,46
Ravi Rajput,RAVI-RAJPUT-UMATH,https://leetcode.com/u/RAVI-RAJPUT-UMATH/,1,8,25,62
Ritesh jha,RITESH12JHA24,https://leetcode.com/u/RITESH12JHA24/,1,6,19,41
Ritik Singh,Ritik_Singh_2311,https://leetcode.com/u/Ritik_Singh_2311/,61,68,101,125
Rohit Malviya,RohitMelasiya,https://leetcode.com/u/RohitMelasiya/,7,10,35,59
Rohit Kumar,rkprasad90600,https://leetcode.com/u/rkprasad90600/,0,8,23,52
Sajan Kumar,Sajan_kumar45,https://leetcode.com/u/Sajan_kumar45/,5,5,5,5
Samina Sultana,Samina_Sultana,https://leetcode.com/u/Samina_Sultana/,57,65,94,130
Sandeep Kumar,sandeepsinu79,https://leetcode.com/u/sandeepsinu79/,0,9,17,45
Sandhya Kaushal,Sandhya_Kaushal,https://leetcode.com/u/Sandhya_Kaushal/,11,24,35,64
Sandhya Parmar,Sandhya_Parmar,https://leetcode.com/u/Sandhya_Parmar/,80,90,100,112
Sarthaksuman Mishra,sarthak-26,https://leetcode.com/u/sarthak-26/,0,12,18,64
Satish Mahto,kr_satish,https://leetcode.com/u/kr_satish/,8,23,40,68
Saurabh Bisht,bocchi_277,https://leetcode.com/u/bocchi_277/,0,4,27,60
Shahid Ansari,shahidthisside,https://leetcode.com/u/shahidthisside/,0,4,19,54
Shalini Priya,Shalini_Priya29,https://leetcode.com/u/Shalini_Priya29/,5,13,22,62
Shilpi shaw,shilpishaw,https://leetcode.com/u/shilpishaw/,52,65,100,136
Shivam Shukla,itz_shuklajii,https://leetcode.com/u/itz_shuklajii/,0,17,28,50
Shivam Shukla,shivamm-shukla,https://leetcode.com/u/shivamm-shukla/,0,7,16,52
Shivang Dubey,Shivangdubey9,https://leetcode.com/u/Shivangdubey9/,0,11,31,67
Shlok Gupta,shlokg62,shlokg62 - LeetCode Profile,69,86,103,124
Shreyank Sthavaramath,shreyank_s,https://leetcode.com/u/shreyank_s/,84,95,102,129
Shubham Kang,Shubham_Kang,https://leetcode.com/u/Shubham_Kang/,6,20,32,58
Sneha Shaw,Sneha6289,https://leetcode.com/u/Sneha6289/,22,35,47,70
Sunny Kumar,sunny_kumar_1,https://leetcode.com/u/sunny_kumar_1/,38,47,59,94
Surveer Singh Rao,Surveer686,https://leetcode.com/u/Surveer686/,22,40,69,106
Swati Kumari,Swati_Kumari_142,https://leetcode.com/u/Swati_Kumari_142/,112,137,162,204
Suyash Yadav,yadavsuyash723,https://leetcode.com/u/yadavsuyash723/,83,91,102,123
Ujjval Baijal,Ujjwal_Baijal,https://leetcode.com/u/Ujjwal_Baijal/,4,11,24,49
Uppara Sai Maithreyi ,sai_maithri,https://leetcode.com/u/sai_maithri/,11,23,44,72
Vinay Kumar,Vinay_Prajapati,https://leetcode.com/u/Vinay_Prajapati/,2,18,41,69
Tamnna parveen,Tamnnaparvreen,https://leetcode.com/u/Tamnnaparvreen/,8,13,40,55
Vinay Kumar Gupta,vinay_gupta01,vinay_gupta01,0,0,11,37
Vishal Bhardwaj,vishalbhardwaj123,vishalbhardwaj123 - LeetCode Profile,0,7,18,35
Vishal Kumar,kumar_vishal_01,https://leetcode.com/u/kumar_vishal_01/,0,12,29,43
Vivek Kumar,its_vivek_001,https://leetcode.com/u/its_vivek_001/,0,5,15,20
Vivek kumar,vivek_75,https://leetcode.com/u/vivek_75/,3,12,30,46
Yuvraj Chirag,Yuvraj_Chirag,https://leetcode.com/u/Yuvraj_Chirag/,85,101,126,155
Yuvraj Singh Bhati,yuvrajsinghbhati01,https://leetcode.com/u/yuvrajsinghbhati01/,15,24,44,66
Naman Damami,namandamami,https://leetcode.com/u/namandamami/,0,7,14,51
Ajay jatav,Ajayjatav,https://leetcode.com/u/AjayJatav/,0,15,37,73
Kuldeep Saraswat,Kuldeep_Saraswat,https://leetcode.com/u/Kuldeep_Saraswat/,0,5,10,23`;

// Parse CSV data
const lines = csvData.trim().split('\n');
const headers = lines[0].split(',');
const students = [];

for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',');
  const student = {
    name: values[0],
    username: values[1],
    week1: parseInt(values[3]) || 0,
    week2: parseInt(values[4]) || 0,
    week3: parseInt(values[5]) || 0,
    week4: parseInt(values[6]) || 0
  };
  students.push(student);
}

// Generate SQL update script
let sqlScript = `-- Update weekly progress data from CSV\n\n`;

students.forEach(student => {
  const week2Progress = student.week2 - student.week1;
  const week3Progress = student.week3 - student.week2;
  const week4Progress = student.week4 - student.week3;
  const totalScore = student.week4;
  const averageWeeklyGrowth = Math.round((student.week4 - student.week1) / 3);

  sqlScript += `-- Update for ${student.name} (${student.username})\n`;
  sqlScript += `UPDATE weekly_progress_data 
SET 
  week1_score = ${student.week1},
  week2_score = ${student.week2},
  week3_score = ${student.week3},
  week4_score = ${student.week4},
  week2_progress = ${week2Progress},
  week3_progress = ${week3Progress},
  week4_progress = ${week4Progress},
  total_score = ${totalScore},
  average_weekly_growth = ${averageWeeklyGrowth},
  updated_at = NOW()
WHERE student_id = (
  SELECT id FROM students WHERE leetcode_username = '${student.username}'
);

-- Insert if not exists
INSERT INTO weekly_progress_data (
  student_id, week1_score, week2_score, week3_score, week4_score,
  week2_progress, week3_progress, week4_progress, total_score, average_weekly_growth
)
SELECT 
  s.id, ${student.week1}, ${student.week2}, ${student.week3}, ${student.week4},
  ${week2Progress}, ${week3Progress}, ${week4Progress}, ${totalScore}, ${averageWeeklyGrowth}
FROM students s
WHERE s.leetcode_username = '${student.username}'
  AND NOT EXISTS (
    SELECT 1 FROM weekly_progress_data w WHERE w.student_id = s.id
  );

`;
});

console.log(sqlScript);