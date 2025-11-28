-- ===============================================
-- LeetCode Student Progress Tracker Database Backup
-- Generated on: 2025-08-02T23:34:39.630Z
-- Transfer Instructions:
-- 1. Copy this file to your new Replit account
-- 2. Ensure your new project has the same database schema 
-- 3. Run: psql $DATABASE_URL -f database_backup_complete.sql
-- 4. Verify data with: SELECT COUNT(*) FROM students;
-- ===============================================

BEGIN;

-- Clear existing data (remove these DELETE statements to preserve existing data)
DELETE FROM weekly_progress_data;
DELETE FROM badges;
DELETE FROM weekly_trends;
DELETE FROM daily_progress;
DELETE FROM app_settings;
DELETE FROM students;

-- ===============================================
-- STUDENTS DATA (145 records)
-- ===============================================

INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('5ec77900-b11b-4f73-86ef-bbcfe78091c0', 'Manish Kumar Tiwari', 'manish__45', 'https://leetcode.com/u/manish__45/', '2025-07-30T08:37:02.693Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('435fa24d-fbe6-4e18-9086-af6fe2e71548', 'Aman Singh', 'Aman_Singh_Sitare', 'https://leetcode.com/u/Aman_Singh_Sitare/', '2025-07-30T08:57:17.679Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('c74b701c-b6bc-48b4-b786-834fe6c3d869', 'Anand Kumar Pandey', 'Anand_Pandey123', 'https://leetcode.com/u/Anand_Pandey123/', '2025-07-30T08:36:38.981Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('532105ae-a70a-4037-85a6-ec87861b40f3', 'Rani Kumari', '123_Rani', 'https://leetcode.com/u/123_Rani/', '2025-07-30T08:37:20.695Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('6ff56caa-ded0-4ff4-9fd6-e297bf38df3b', 'Swati Kumari', 'Swati_Kumari_142', 'https://leetcode.com/u/Swati_Kumari_142/', '2025-07-30T08:55:57.793Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('64bb0d09-5d8f-4dc7-adbf-3195483e6eef', 'Himanshu Srivastav', 'codeCrafter777', 'https://leetcode.com/u/codeCrafter777/', '2025-07-30T08:36:56.053Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('25da5cb1-3c7f-4853-99ab-78a19d145255', 'Yuvraj Chirag', 'Yuvraj_Chirag', 'https://leetcode.com/u/Yuvraj_Chirag/', '2025-07-30T08:56:02.921Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('9d239dbf-4d73-4b73-b3f5-2d06a3e6d697', 'Nidhi Kumari', 'Nid_Singh', 'https://leetcode.com/u/Nid_Singh/', '2025-08-02T10:48:59.903Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('053febaa-804e-43bc-a606-f0b32bb2519c', 'Ishant Bhoyar', 'Ishant_57', 'https://leetcode.com/u/Ishant_57/', '2025-07-30T08:36:57.950Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('6705ebf8-fe1a-4196-a98d-95d6471e6d03', 'Priyadarshi Kumar', 'iPriyadarshi', 'https://leetcode.com/u/iPriyadarshi/', '2025-07-30T08:37:16.904Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('0d823894-0176-495c-87ce-20097a583321', 'Shilpi shaw', 'shilpishaw', 'https://leetcode.com/u/shilpishaw/', '2025-07-30T08:55:53.125Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d50c6385-1dc5-475f-a8fb-451881c9c716', 'Aryan Saini', 'aryan8773', 'https://leetcode.com/u/aryan8773/', '2025-07-30T08:36:43.239Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('8d955474-d4dd-41a1-b15e-5b8b4a55b2ea', 'Shlok Gupta', 'shlokg62', 'https://leetcode.com/u/shlokg62/', '2025-07-30T08:55:54.996Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('7cf11203-440f-4569-bbcc-16e0c3433dc1', 'Samina Sultana', 'Samina_Sultana', 'https://leetcode.com/u/Samina_Sultana/', '2025-07-30T08:55:48.925Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('20126993-4b0d-416b-ad9d-c8297602495a', 'Prachi Dhakad', 'prachiDhakad', 'https://leetcode.com/u/prachiDhakad/', '2025-07-30T08:37:13.584Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('14a31dce-9b45-489c-8f63-828b9923c998', 'Ritik Singh', 'Ritik_Singh_2311', 'https://leetcode.com/u/Ritik_Singh_2311/', '2025-07-30T08:55:47.052Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4446a050-c281-4919-baf3-b9ae0448a9b5', 'Shreyank Sthavaramath', 'shreyank_s', 'https://leetcode.com/u/shreyank_s/', '2025-07-30T08:55:55.461Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('25ff7510-3171-4819-8142-8f057a823f9f', 'Suyash Yadav', 'yadavsuyash723', 'https://leetcode.com/u/yadavsuyash723/', '2025-07-30T08:55:58.257Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('6bdc8bfe-527f-472b-82e3-92bee65b0e5a', 'Anuradha Tiwari', 'anuradha_24', 'https://leetcode.com/u/anuradha_24/', '2025-07-30T08:57:19.803Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('cc687455-958c-463f-b335-d5e3f526bf30', 'Janu Chaudhary', 'Janu_Chaudhary', 'https://leetcode.com/u/Janu_Chaudhary/', '2025-07-30T08:36:59.372Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('cb9ef1ab-3ce1-4fe5-98be-345037cffe6c', 'Priya Saini', 'Priya_saini2004', 'https://leetcode.com/u/Priya_saini2004/', '2025-07-30T08:37:16.431Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('9787009a-50fc-4691-9c71-f689f0267e78', 'Harsh Chourasiya', 'harshchourasiya295', 'https://leetcode.com/u/harshchourasiya295/', '2025-07-30T08:36:54.632Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a654af61-5fb9-488e-9b80-02af4d2ed99d', 'Pragati Chauhan', 'Chauhan_Pragati', 'https://leetcode.com/u/Chauhan_Pragati/', '2025-07-30T08:37:14.060Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('eddc341e-e2a4-45f7-b880-19e75f2d3948', 'Arjun Kadam', 'arjunkadampatil', 'https://leetcode.com/u/arjunkadampatil/', '2025-07-30T08:36:41.821Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b9404122-e3ba-4556-b047-1a818de8563f', 'Harisingh Rajpoot', 'HarisinghRaj', 'https://leetcode.com/u/HarisinghRaj/', '2025-07-30T08:36:54.155Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('eede2fb3-5b57-4d19-b2ce-3d519daadcde', 'Sandhya Parmar', 'Sandhya_Parmar', 'https://leetcode.com/u/Sandhya_Parmar/', '2025-07-30T08:55:50.327Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('580bce8c-5cd2-4986-96ec-3dd320e7a6b9', 'Surveer Singh Rao', 'Surveer686', 'https://leetcode.com/u/Surveer686/', '2025-07-30T08:55:57.326Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('848c6bcb-71f3-47bd-8d0f-7100d128c7da', 'Guman Singh Rajpoot', 'Guman_singh_rajpoot', 'https://leetcode.com/u/Guman_singh_rajpoot/', '2025-07-30T08:36:53.679Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('23334269-d111-46d9-a795-8005907f8ea7', 'Ramraj Nagar', 'Ramrajnagar', 'https://leetcode.com/u/Ramrajnagar/', '2025-07-30T08:37:20.221Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('314420cc-781c-4901-bf52-467558af6801', 'Mausam kumari', 'Mausam-kumari', 'https://leetcode.com/u/Mausam-kumari/', '2025-07-30T08:37:04.113Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('970ca8d3-0221-48f5-a1ff-a41ddd080bb3', 'Bhagwati', 'Bhagwati323', 'https://leetcode.com/u/Bhagwati323/', '2025-07-30T08:36:45.612Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ef70c523-bc49-4476-a822-b9a4e02faf1b', 'Disha Sahu', 'Disha-01-alt', 'https://leetcode.com/u/Disha-01-alt/', '2025-07-30T08:36:50.362Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d5ea0b5c-28e5-4a26-9456-c689334e7b1b', 'Moirangthem Joel Singh', 'JoelMoirangthem', 'https://leetcode.com/u/JoelMoirangthem/', '2025-07-30T08:37:06.955Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('eadeba07-0194-41e5-ba13-14fd857df779', 'KARANPAL SINGH RANAWAT', 'krtechie', 'https://leetcode.com/u/krtechie/', '2025-07-30T08:36:59.844Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('44210e81-937a-423b-a477-eda3bbdbb542', 'Shivam Shukla', 'itz_shuklajii', 'https://leetcode.com/u/itz_shuklajii/', '2025-07-30T08:55:53.591Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('78d1f1ea-bc42-461f-88ad-1025c3dabe36', 'Nikhil Kumar Mehta', 'Nikhil_KM_04', 'https://leetcode.com/u/Nikhil_KM_04/', '2025-07-30T08:37:09.798Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('2a4b7a15-8d01-4046-a203-018a12aa6fd3', 'Sunny Kumar', 'sunny_kumar_1', 'https://leetcode.com/u/sunny_kumar_1/', '2025-07-30T08:55:56.858Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b8535a47-eaba-4a85-acc5-819dc3ea2c79', 'Arpita Tripathi', 'Uny60jPJeO', 'https://leetcode.com/u/Uny60jPJeO/', '2025-07-30T08:36:42.293Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('dd80d19f-b9d1-4799-9d56-cca95b09a4c1', 'Anushri Mishra', 'Anushri_Mishra', 'https://leetcode.com/u/Anushri_Mishra/', '2025-07-30T08:36:40.876Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('239c7649-391f-4600-aa6d-1670223123fc', 'Challa Trivedh Kumar', 'TrivedhChalla', 'https://leetcode.com/u/TrivedhChalla/', '2025-07-30T08:36:47.045Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('02b5fab4-88ea-4a9c-a7b2-1bfaa14e7bbc', 'Gaurav Rathore', 'Gaurav_rathore96', 'https://leetcode.com/u/Gaurav_rathore96/', '2025-07-30T08:36:52.254Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b230f1fc-6f85-40a6-bb08-3626cf97d982', 'Rakshita K Biradar', 'RakshitaKBiradar', 'https://leetcode.com/u/RakshitaKBiradar/', '2025-07-30T08:57:40.127Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ea804269-6e81-4a19-8778-c9de2c3b7976', 'khushi Narwariya', 'khushi_narwariya', 'https://leetcode.com/u/khushi_narwariya/', '2025-07-30T08:37:00.318Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('26847339-13af-44dc-af64-66d28f3dd0be', 'Pawan Kushwah', 'pawankushwah', 'https://leetcode.com/u/pawankushwah/', '2025-07-30T08:37:11.690Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('0885f3b5-4d34-41b1-b4c1-ed1aefe689c8', 'Manoj Kharkar', 'manojk909', 'https://leetcode.com/u/manojk909/', '2025-07-30T08:37:03.165Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b02c2c63-22d4-428e-8e6e-7d023820b98d', 'Monu Rajpoot', 'Monurajpoot', 'https://leetcode.com/u/Monurajpoot/', '2025-07-30T08:37:07.429Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('8b328b80-b670-4bb4-aef9-252091d9971d', 'Akanksha', 'Akanksha_kushwaha_a', 'https://leetcode.com/u/Akanksha_kushwaha_a/', '2025-07-30T08:36:35.186Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e56134f3-a7b0-462c-a7b6-4072bf416f13', 'Hirak Nath', 'hirak__', 'https://leetcode.com/u/hirak__/', '2025-07-30T08:36:57.003Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a7e7d80a-1382-45c5-ac94-de91f4a6a7ae', 'Manoj Dewda', 'Manoj_Dewda022', 'https://leetcode.com/u/Manoj_Dewda022/', '2025-07-30T08:37:03.639Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('c4cf1f8f-446e-455a-84c6-948fee323d45', 'Vinay Kumar', 'Vinay_Prajapati', 'https://leetcode.com/u/Vinay_Prajapati/', '2025-07-30T08:55:59.652Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('470f521a-bb65-4bf9-bf79-3458953ce692', 'Hiranya Patil', 'hiranya_patil', 'https://leetcode.com/u/hiranya_patil/', '2025-07-30T08:36:57.476Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('33932a5f-3799-48f8-bd10-44a045e89761', 'Sneha Shaw', 'Sneha6289', 'https://leetcode.com/u/Sneha6289/', '2025-07-30T08:55:56.392Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('04116f10-07bb-4f95-94f6-509aeeeff813', 'Uppara Sai Maithreyi', 'sai_maithri', 'https://leetcode.com/u/sai_maithri/', '2025-07-30T08:55:59.187Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a015d1c5-ac09-48bb-80f3-285f2777ff16', 'Neeraj Parmar', 'Neeru888', 'https://leetcode.com/u/Neeru888/', '2025-07-30T08:37:08.375Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('27aa02ae-619c-42c8-92f9-a9487224190d', 'Prabhat Patidar', 'Prabhat7987', 'https://leetcode.com/u/Prabhat7987/', '2025-07-30T08:37:13.111Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('74682f71-5d10-473d-884d-78af141f0e77', 'Ajay jatav', 'Ajayjatav', 'https://leetcode.com/u/AjayJatav/', '2025-07-30T08:56:04.322Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('80fb9e6a-28bc-4b1a-b71d-c4d176e11aab', 'Chiranjeet Biswas', 'Chiranjeet_Biswas', 'https://leetcode.com/u/Chiranjeet_Biswas/', '2025-07-30T08:36:47.992Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a3a47539-0c42-4449-b242-150dffa9c114', 'Debangsu Misra', 'debangsumisra', 'https://leetcode.com/u/debangsumisra/', '2025-07-30T08:36:48.465Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a6b28c11-a2f3-45dd-b629-0b802b75acb4', 'Mehtab Alam', 'alamehtab', 'https://leetcode.com/u/alamehtab/', '2025-07-30T08:57:32.090Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b5ff51f7-41ef-4095-bd3e-a5f7764e1622', 'Yuvraj Singh Bhati', 'yuvrajsinghbhati01', 'https://leetcode.com/u/yuvrajsinghbhati01/', '2025-07-30T08:56:03.386Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('383480b0-52ce-4ea6-ab74-ac8fcbeb43bc', 'Ravi Rajput', 'RAVI-RAJPUT-UMATH', 'https://leetcode.com/u/RAVI-RAJPUT-UMATH/', '2025-07-30T08:37:22.114Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('eefc776d-f821-46d5-b42b-ff3124549b26', 'Shivang Dubey', 'Shivangdubey9', 'https://leetcode.com/u/Shivangdubey9/', '2025-07-30T08:55:54.530Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('c63b26a1-b257-43e7-911c-4fdd34a905e4', 'Ekta kumari', 'EktaSaw1212', 'https://leetcode.com/u/EktaSaw1212/', '2025-07-30T08:36:51.781Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('60558163-98e7-4575-94d1-258b24312072', 'Satish Mahto', 'kr_satish', 'https://leetcode.com/u/kr_satish/', '2025-07-30T08:55:51.260Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('bf9260c6-b2ad-45ca-b823-08ec14a09d77', 'Harshit Chaturvedi', 'thisharshit', 'https://leetcode.com/u/thisharshit/', '2025-07-30T08:36:55.106Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('de20d8ed-2ee2-4305-8689-3b1e2097d08f', 'Himanshu Kanwar Chundawat', 'himanshu_chundawat', 'https://leetcode.com/u/himanshu_chundawat/', '2025-07-30T08:36:56.530Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('94b7fcd1-7763-4505-968b-62f4e19c6017', 'Abhishek Singh', 'Abhishek_2008', 'https://leetcode.com/u/Abhishek_2008/', '2025-07-30T08:36:33.764Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('83046fb6-ed99-42c0-9e1a-b2f1d6648279', 'Ajit Yadav', 'Ajit_Yadav_2908', 'https://leetcode.com/u/Ajit_Yadav_2908/', '2025-07-30T08:36:34.713Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4daaac39-4f0e-4f1a-a91e-e88c8ee566cb', 'Prem Kumar', 'prem2450', 'https://leetcode.com/u/prem2450/', '2025-07-30T08:37:15.010Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d08d4384-3e25-4720-8ea5-3480c70e2e69', 'Pranjal Dubey', 'Pranjal428', 'https://leetcode.com/u/Pranjal428/', '2025-07-30T08:37:14.533Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4840b9aa-aaed-4b15-8f7d-d1bf586289b9', 'Sandhya Kaushal', 'Sandhya_Kaushal', 'https://leetcode.com/u/Sandhya_Kaushal/', '2025-07-30T08:55:49.861Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4eb5aca4-eb8f-48f6-a342-07e9b227d252', 'Shalini Priya', 'Shalini_Priya29', 'https://leetcode.com/u/Shalini_Priya29/', '2025-07-30T08:55:52.660Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ea9e6245-2398-4659-b4a3-3f9617bc39b6', 'Sarthaksuman Mishra', 'sarthak-26', 'https://leetcode.com/u/sarthak-26/', '2025-07-30T08:55:50.794Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('953c988b-ab8d-4bf9-ba5a-cc5aa249c8e7', 'Aditya', 'Aadi_Singh_28', 'https://leetcode.com/u/Aadi_Singh_28/', '2025-07-30T08:36:34.238Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('2db2ba6b-0867-4a6b-ad9d-8ccbe9fe4c26', 'Divyanshi Rathour', 'Divyanshirathour', 'https://leetcode.com/u/Divyanshirathour/', '2025-07-30T08:36:51.307Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('8591790e-46f8-4e51-9c8f-7b2452298de6', 'Jamal Akhtar', 'kKJ7y7Q9Ks', 'https://leetcode.com/u/kKJ7y7Q9Ks/', '2025-07-30T08:36:58.895Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e1a1cd3a-cea3-49a6-ad3a-85ead7ed4e5d', 'Rajeev Yadav', 'kn1gh7t', 'https://leetcode.com/u/kn1gh7t/', '2025-07-30T08:37:18.796Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('19920cf9-aa64-4b86-91be-2c7001af4617', 'Rohit Malviya', 'RohitMelasiya', 'https://leetcode.com/u/RohitMelasiya/', '2025-07-30T08:55:47.529Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('622f043b-16f0-473d-a310-a1ad5ff077fd', 'Rajiv Kumar', 'rajiv1478', 'https://leetcode.com/u/rajiv1478/', '2025-07-30T08:37:19.271Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('0e08463b-6820-49a4-9d5d-f51155e8126a', 'Prem Shankar Kushwaha', 'PCodex9', 'https://leetcode.com/u/PCodex9/', '2025-07-30T08:37:15.485Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ef867ef9-7255-4d78-a85a-1e78ff45433a', 'Pushpraj singh', 'Pushpraj_DSA', 'https://leetcode.com/u/Pushpraj_DSA/', '2025-07-30T08:37:17.378Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('19d43931-8406-4ba9-8b68-fada97d63aae', 'Saurabh Bisht', 'bocchi_277', 'https://leetcode.com/u/bocchi_277/', '2025-07-30T08:55:51.727Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f2f72e23-354f-4f57-8aa8-39d644c6b5df', 'Rohit Kumar', 'rkprasad90600', 'https://leetcode.com/u/rkprasad90600/', '2025-07-30T08:57:42.487Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('bc20bb78-f46b-4d85-9715-528f67624219', 'Alok Raj', 'alok-work23', 'https://leetcode.com/u/alok-work23/', '2025-07-30T08:36:35.660Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ccd78705-bcce-4fea-aabd-af9d69a732c3', 'Himanshu kumar', 'ansraaz86', 'https://leetcode.com/u/ansraaz86/', '2025-07-30T08:36:55.580Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ac32c466-4a79-42e7-83c5-52488ac1eb73', 'Shivam Shukla', 'shivamm-shukla', 'https://leetcode.com/u/shivamm-shukla/', '2025-07-30T08:55:54.056Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a1888b67-a17f-403b-bb95-2035ed1399c1', 'Shubham Kang', 'Shubham_Kang', 'https://leetcode.com/u/Shubham_Kang/', '2025-07-30T08:55:55.926Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('5a5bde23-a062-4155-9807-c12817b2eb2a', 'Amit Kumar', 'Amit_Kumar13', 'https://leetcode.com/u/Amit_Kumar13/', '2025-07-30T08:36:37.556Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('05dcabff-6f0d-44e5-ae0c-bc4c04c25393', 'Rahul Kumar', 'rahu48', 'https://leetcode.com/u/rahu48/', '2025-07-30T08:37:17.852Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('87a78f59-ec4f-4b05-8aae-d92406db0021', 'Prerana Rajnag', 'preranarajnag', 'https://leetcode.com/u/preranarajnag/', '2025-07-30T08:37:15.958Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('0d02061b-b2e3-4b07-9e45-f51a3f017a84', 'Nirmal Kumar', 'r2GUlBuyLZ', 'https://leetcode.com/u/r2GUlBuyLZ/', '2025-07-30T08:57:52.407Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('0ca5a38c-a24e-4748-937e-8c2a06585b35', 'Tamnna parveen', 'Tamnnaparvreen', 'https://leetcode.com/u/Tamnnaparvreen/', '2025-07-30T08:57:53.879Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d5896721-2d2e-4e6f-b914-cf50962714c3', 'Mani Kumar', 'MANIKUMAR7109', 'https://leetcode.com/u/MANIKUMAR7109/', '2025-07-30T08:37:01.744Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e9f448a2-6e79-472a-b54a-3e2b7227732e', 'Mohit Sharma', 'sharma_Mohit_2005', 'https://leetcode.com/u/sharma_Mohit_2005/', '2025-07-30T08:37:06.482Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('775e4461-3ef1-4594-8607-cb51264172fe', 'Pooran Singh', 'pooransingh01', 'https://leetcode.com/u/pooransingh01/', '2025-07-30T08:37:12.634Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e47fa29e-70aa-4119-a537-916f4ddaac9c', 'Aaditya Raj', 'aadi2532', 'https://leetcode.com/u/aadi2532/', '2025-07-30T08:36:33.282Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4d3fc523-4dce-44a7-bf58-4d392a6abc61', 'Dilip Vaishnav', 'Dilip_Vaishnav_07', 'https://leetcode.com/u/Dilip_Vaishnav_07/', '2025-07-30T08:36:49.414Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('325b2116-87c3-445d-ae3e-40e172488390', 'Ritesh jha', 'RITESH12JHA24', 'https://leetcode.com/u/RITESH12JHA24/', '2025-07-30T08:37:22.587Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b3d7a07a-e398-403c-a06e-6fef9a1098d9', 'Shahid Ansari', 'shahidthisside', 'https://leetcode.com/u/shahidthisside/', '2025-07-30T08:55:52.192Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('8b048c59-8456-46a6-8456-2025af836d1a', 'Rahul Kumar Verma', 'RahulVermaji', 'https://leetcode.com/u/RahulVermaji/', '2025-07-30T08:37:18.324Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('bc33191e-2292-454b-82f6-34d965b5e8a0', 'Anoop kumar', 'Anoop_kumar123', 'https://leetcode.com/u/Anoop_kumar123/', '2025-07-30T08:36:39.454Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('820f69cd-a8af-43b0-b22e-810faf872cf7', 'Ayush Kumar Yadav', 'Ayush_Yadav_029', 'https://leetcode.com/u/Ayush_Yadav_029/', '2025-07-30T08:36:45.140Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('226a20bc-b490-4a83-9275-2060f17f6dcb', 'Dilip Suthar', 'Dilip0552', 'https://leetcode.com/u/Dilip0552/', '2025-07-30T08:36:49.890Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('022e7727-d91a-47bb-95fd-fe95e3d77d75', 'Divyanshi Sahu', 'ADHIINSVY13', 'https://leetcode.com/u/ADHIINSVY13/', '2025-07-30T08:36:50.834Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e78cc876-136f-4257-a040-2311fb75d4e3', 'Mayank Raj', 'mayankRajRay', 'https://leetcode.com/u/mayankRajRay/', '2025-07-30T08:37:04.589Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('153d9800-632d-4ef7-a8b0-0cbbdec511ac', 'N.Arun Kumar', 'Arunkumar087', 'https://leetcode.com/u/Arunkumar087/', '2025-07-30T08:37:07.902Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('44fcc231-c561-4033-9a69-bd76463c2be6', 'Aman Adarsh', 'amanadarsh1168', 'https://leetcode.com/u/amanadarsh1168/', '2025-07-30T08:36:37.084Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f6d50422-1bb9-4986-968d-0f317fad1307', 'Aradhya patel', 'aradhya789', 'https://leetcode.com/u/aradhya789/', '2025-07-30T08:36:41.349Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ca3e44b8-ae5d-45ad-b3c3-8329d2eafa1e', 'Ashwin yadav', 'ashwin-tech', 'https://leetcode.com/u/ashwin-tech/', '2025-07-30T08:36:43.714Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('a931db00-3c42-4c92-83a0-62a409bd8767', 'Bhaskar Mahato', 'bhaskarmahato03', 'https://leetcode.com/u/bhaskarmahato03/', '2025-07-30T08:36:46.086Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('c2f6c7be-ecef-48d2-b41b-dc26e84b1923', 'Pinky Rana', 'ranapink398', 'https://leetcode.com/u/ranapink398/', '2025-07-30T08:37:12.162Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f7fe0d4c-e827-458e-b029-eb3705c01ba6', 'Ravi Mourya', 'MouryaRavi', 'https://leetcode.com/u/6G3TE2HiE0/', '2025-07-30T08:37:21.640Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('fa0c1651-a329-44d6-a09e-b58a05c294b7', 'Naman Damami', 'namandamami', 'https://leetcode.com/u/namandamami/', '2025-07-30T08:56:03.854Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('4ad99624-56e8-45ca-bee2-4404f36418cf', 'MOHD MONIS', 'codemon-07', 'https://leetcode.com/u/codemon-07/', '2025-07-30T08:37:06.009Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d67f73d1-5205-46fa-b0e3-a9ec97612e93', 'Ayush Kumar', 'Ayush4Sony', 'https://leetcode.com/u/Ayush4Sony/', '2025-07-30T08:36:44.661Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ef61c9a4-b055-4a18-a903-0d4ab61e57ba', 'Byagari Praveen Kumar', 'Mr_bpk_4433', 'https://leetcode.com/u/Mr_bpk_4433/', '2025-07-30T08:36:46.565Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f885d44f-831d-40b6-b0f6-6dd1db997b96', 'Ujjval Baijal', 'Ujjwal_Baijal', 'https://leetcode.com/u/Ujjwal_Baijal/', '2025-07-30T08:55:58.722Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('175b0a77-c19b-400e-89b8-f143fb4e541f', 'Anamika Kumari', 'tanamika', 'https://leetcode.com/u/tanamika/', '2025-07-30T08:36:38.029Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('23d5d960-e258-48c8-9c8d-78ff55646dfe', 'Ompal Yadav', 'om_codes1', 'https://leetcode.com/u/om_codes1/', '2025-07-30T08:37:11.215Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('10117fbb-d910-4ba3-8163-b150f6d2fc85', 'Vivek kumar', 'vivek_75', 'https://leetcode.com/u/vivek_75/', '2025-07-30T08:56:02.450Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('fcb7dc8b-003f-4a50-b39d-9c76adc7c957', 'Nirmal Mewada', 'nirmal_M01', 'https://leetcode.com/u/nirmal_M01/', '2025-07-30T08:37:10.743Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('eaa2e58d-9aae-461d-b8cd-70d3bef51f72', 'Chandan Giri', 'WelcomeGseries', 'https://leetcode.com/u/WelcomeGseries/', '2025-07-30T08:36:47.519Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('c6ae433f-a923-44f5-8836-0efd41d3372c', 'Gaurav kumar', 'gaurav_vvv', 'https://leetcode.com/u/gaurav_vvv/', '2025-07-30T08:36:52.729Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f3f7bb88-76dc-4475-a6f4-c84f3824e83b', 'Anshu Kumar', 'CodebyAnshu03', 'https://leetcode.com/u/CodebyAnshu03/', '2025-07-30T08:36:39.930Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f1f6826b-ca51-4021-a000-76f09967280c', 'Sandeep Kumar', 'sandeepsinu79', 'https://leetcode.com/u/sandeepsinu79/', '2025-07-30T08:55:49.394Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('fed9aaca-b863-4357-a17b-eca8afe3d7b4', 'Vishal Kumar', 'kumar_vishal_01', 'https://leetcode.com/u/kumar_vishal_01/', '2025-07-30T08:56:01.515Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b93cc8c7-ef3e-4edf-af25-4e02e5ac8ac6', 'Lakhan Rathore', 'Lakhan_rathore', 'https://leetcode.com/u/Lakhan_rathore/', '2025-07-30T08:37:00.792Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('d87c8607-04cd-498f-8954-379f35186e4b', 'Arun kumar', 'Arun_404', 'https://leetcode.com/u/Arun_404/', '2025-07-31T05:00:59.163Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ef5ea6da-4d8f-4a97-a872-573758efe738', 'NIKHIL Chaurasiya', 'Rdxnikhil', 'https://leetcode.com/u/Rdxnikhil/', '2025-07-30T08:37:09.320Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('83f7619c-a0c2-4056-906d-3c464140ce49', 'Manish Chhaba', 'Chhaba_Manish', 'https://leetcode.com/u/Chhaba_Manish/', '2025-07-30T08:37:02.218Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('44f5a7ad-9ad9-4b92-abf7-281d6a82fa61', 'Vinay Kumar Gupta', 'vinay_gupta01', 'https://leetcode.com/u/vinay_gupta01/', '2025-07-30T08:56:00.581Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('3015cacc-2887-41c4-9ebb-581d9a212692', 'Mohammad Afzal Raza', 'Afzal_Raza', 'https://leetcode.com/u/Afzal_Raza/', '2025-07-30T08:57:32.563Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('b523e283-136b-48aa-8813-3d6ab91dea3a', 'Gaurav Tiwari', 'gauravtiwari_70', 'https://leetcode.com/u/gauravtiwari_70/', '2025-07-30T08:36:53.203Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('2740e2f0-01fe-4175-92d3-d4f828905671', 'Vishal Bhardwaj', 'vishalbhardwaj123', 'https://leetcode.com/u/vishalbhardwaj123/', '2025-07-30T08:56:01.049Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('e8e0bfe6-4f1f-446a-b2f4-573d282f1bf6', 'Ranjeet kumar yadav', 'DL6FbStsPL', 'https://leetcode.com/u/DL6FbStsPL/', '2025-07-31T12:46:54.429Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('454ac5c3-2602-4d87-9b9f-3cd31002d4f8', 'Maneesh Sakhwar', 'Maneesh_Sakhwar', 'https://leetcode.com/u/Maneesh_Sakhwar/', '2025-07-30T08:37:01.269Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f36ba9f6-0b62-4138-8a53-1c0b0b0f908d', 'Jagriti Pandey', 'jagriti_Pandey01', 'https://leetcode.com/u/jagriti_Pandey01/', '2025-07-30T08:36:58.423Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('289d6cc3-cf85-4da0-99ba-15ba13846e66', 'Kuldeep Saraswat', 'Kuldeep_Saraswat', 'https://leetcode.com/u/Kuldeep_Saraswat/', '2025-08-02T10:49:49.616Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('77730508-65ec-4f52-90f3-dee14849807f', 'Vivek Kumar', 'its_vivek_001', 'https://leetcode.com/u/its_vivek_001/', '2025-07-30T08:56:01.981Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('f0fd7903-2297-43a0-900d-ca15c22da343', 'Aman Verma', 'aman1640', 'https://leetcode.com/u/aman1640/', '2025-07-30T08:36:36.135Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('ef8e2de7-164c-43ef-a966-ac6f26a60f6b', 'Sajan Kumar', 'Sajan_kumar45', 'https://leetcode.com/u/Sajan_kumar45/', '2025-07-30T08:55:48.460Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('bbbaba44-2eeb-40f7-8a30-532fc65f500c', 'Arun kumar', 'Arun_404notfound', 'https://leetcode.com/u/Arun_404notfound/', '2025-07-30T08:36:42.767Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('35d68865-4f2a-4096-a124-c503681546c8', 'Deepak Mandal', 'AlgoMandal', 'https://leetcode.com/u/AlgoMandal/', '2025-07-30T08:36:48.939Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('35ff41ae-29dd-46d5-ae85-169fddc74a6b', 'Anand Singh', 'of0DUuvBjV', 'https://leetcode.com/u/of0DUuvBjV/', '2025-07-30T08:36:38.509Z');
INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at) VALUES ('69c9a9e2-7af3-40f9-bd03-289af1b1b8b4', 'Ranjeet kumar yadav', 'Ranjeet_kumar', 'https://leetcode.com/u/DL6FbStsPL/', '2025-07-30T08:37:21.168Z');

-- ===============================================
-- WEEKLY PROGRESS DATA (130 records)
-- ===============================================

-- Note: Weekly progress data will be regenerated when you import the CSV file
-- Run: POST /api/import/weekly-progress to restore this data


-- ===============================================
-- COMPLETION
-- ===============================================

COMMIT;

-- Success message
SELECT 'Database backup import completed successfully!' as status;

-- Verification queries (run these after import)
-- SELECT COUNT(*) as student_count FROM students;
-- SELECT COUNT(*) as progress_count FROM daily_progress;
-- SELECT COUNT(*) as weekly_count FROM weekly_progress_data;
-- SELECT COUNT(*) as badge_count FROM badges;

-- To restore weekly progress data after import:
-- 1. Ensure your CSV file is in attached_assets/
-- 2. Call POST /api/import/weekly-progress
-- 3. Verify with: SELECT COUNT(*) FROM weekly_progress_data;
