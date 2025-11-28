--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_settings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.app_settings (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    last_sync_time timestamp without time zone,
    is_auto_sync_enabled boolean DEFAULT true
);


ALTER TABLE public.app_settings OWNER TO neondb_owner;

--
-- Name: badges; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.badges (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    badge_type text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    earned_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.badges OWNER TO neondb_owner;

--
-- Name: daily_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.daily_progress (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    date text NOT NULL,
    total_solved integer DEFAULT 0 NOT NULL,
    easy_solved integer DEFAULT 0 NOT NULL,
    medium_solved integer DEFAULT 0 NOT NULL,
    hard_solved integer DEFAULT 0 NOT NULL,
    daily_increment integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.daily_progress OWNER TO neondb_owner;

--
-- Name: public_dashboards; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.public_dashboards (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    public_url text NOT NULL,
    is_enabled boolean DEFAULT false,
    view_count integer DEFAULT 0,
    last_viewed_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.public_dashboards OWNER TO neondb_owner;

--
-- Name: student_submissions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.student_submissions (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    problem_title text NOT NULL,
    problem_url text NOT NULL,
    difficulty text NOT NULL,
    topic_tags jsonb DEFAULT '[]'::jsonb,
    screenshot_url text,
    status text DEFAULT 'pending'::text,
    submitted_at timestamp without time zone DEFAULT now(),
    verified_at timestamp without time zone,
    verified_by character varying
);


ALTER TABLE public.student_submissions OWNER TO neondb_owner;

--
-- Name: student_topic_mastery; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.student_topic_mastery (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    topic_tag_id character varying NOT NULL,
    problems_solved integer DEFAULT 0 NOT NULL,
    total_problems integer DEFAULT 0 NOT NULL,
    mastery_percentage integer DEFAULT 0 NOT NULL,
    last_updated timestamp without time zone DEFAULT now()
);


ALTER TABLE public.student_topic_mastery OWNER TO neondb_owner;

--
-- Name: students; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.students (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    leetcode_username text NOT NULL,
    leetcode_profile_link text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.students OWNER TO neondb_owner;

--
-- Name: topic_tags; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.topic_tags (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    color text DEFAULT '#3B82F6'::text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.topic_tags OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'student'::text NOT NULL,
    student_id character varying,
    is_active boolean DEFAULT true,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: weekly_trends; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.weekly_trends (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    student_id character varying NOT NULL,
    week_start text NOT NULL,
    week_end text NOT NULL,
    total_problems integer DEFAULT 0 NOT NULL,
    weekly_increment integer DEFAULT 0 NOT NULL,
    ranking integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.weekly_trends OWNER TO neondb_owner;

--
-- Data for Name: app_settings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.app_settings (id, last_sync_time, is_auto_sync_enabled) FROM stdin;
5ee83561-7215-468c-bf43-db0dfcd8c5f1	2025-07-30 11:46:00.592	t
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.badges (id, student_id, badge_type, title, description, icon, earned_at) FROM stdin;
af40329a-e525-4bc8-b060-9398d82aa488	20126993-4b0d-416b-ad9d-c8297602495a	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.001659
677f002b-5c02-4312-8948-263180030428	eddc341e-e2a4-45f7-b880-19e75f2d3948	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.110896
661b475e-a115-4fd7-bdea-cf1eb1e55330	cc687455-958c-463f-b335-d5e3f526bf30	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.388174
3f2b0bca-75f1-4431-a9eb-15ed2e996349	cb9ef1ab-3ce1-4fe5-98be-345037cffe6c	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.749028
1b77d367-b9c9-4791-a723-68098b7aeaa0	a654af61-5fb9-488e-9b80-02af4d2ed99d	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.833886
9ed7cc29-8179-4c9f-836e-d557a14d2548	d50c6385-1dc5-475f-a8fb-451881c9c716	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.854025
76ad8262-28df-486a-a070-0fd52d7b240e	5ec77900-b11b-4f73-86ef-bbcfe78091c0	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.866247
3fd42de8-8667-4962-a447-5bb45bef8b20	532105ae-a70a-4037-85a6-ec87861b40f3	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:49.936737
eb0ba294-a151-49ff-b35d-9d02f59a74eb	c74b701c-b6bc-48b4-b786-834fe6c3d869	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:50.097887
2f27722a-d121-499e-a59e-8f1342247bac	053febaa-804e-43bc-a606-f0b32bb2519c	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:50.204012
c2764e20-9cc1-4dea-8ef7-3fb6a96441fb	64bb0d09-5d8f-4dc7-adbf-3195483e6eef	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:50.554748
1cbbc489-33c6-4435-8cab-f091ce3618d2	6705ebf8-fe1a-4196-a98d-95d6471e6d03	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:50.556587
ed781d3a-d379-417f-9820-883d06982f28	9787009a-50fc-4691-9c71-f689f0267e78	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:38:50.561975
a9a2c161-d7d5-4ed0-a863-d2c06f95a08f	14a31dce-9b45-489c-8f63-828b9923c998	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.226937
acbceb03-41e4-4327-a381-31c166245314	0d823894-0176-495c-87ce-20097a583321	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.26246
3ef60662-7ed8-470c-97e6-73c55cbd59c3	4446a050-c281-4919-baf3-b9ae0448a9b5	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.274126
a148b3c0-eb09-4eb4-9182-97bf3ece16bf	8d955474-d4dd-41a1-b15e-5b8b4a55b2ea	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.319257
3f36a93a-5765-456e-b39f-719b13b5b77d	25ff7510-3171-4819-8142-8f057a823f9f	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.384615
38ca0258-9301-4a3a-9c39-e2067ebf30a0	7cf11203-440f-4569-bbcc-16e0c3433dc1	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.688955
53d58757-48d0-406c-9024-54945ff7da9a	25da5cb1-3c7f-4853-99ab-78a19d145255	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:18.692192
401922e5-63de-4b11-b356-1ff782cc2225	6ff56caa-ded0-4ff4-9fd6-e297bf38df3b	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:56:19.180045
842bf658-752f-43f5-b6d8-bbf6af589f67	7c5d12f0-dd76-4c75-abff-8c6c07e7bde2	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:58:07.964576
adb70b7d-1f0b-43ab-bc2a-af1e81c2bf05	6bdc8bfe-527f-472b-82e3-92bee65b0e5a	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:58:09.271547
eae7e217-1494-4ceb-b4d2-efb2aace28d4	435fa24d-fbe6-4e18-9086-af6fe2e71548	century_coder	💯 Century Coder	100+ total problems solved	fas fa-code	2025-07-30 08:58:09.502662
\.


--
-- Data for Name: daily_progress; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.daily_progress (id, student_id, date, total_solved, easy_solved, medium_solved, hard_solved, daily_increment, created_at) FROM stdin;
a98fce35-4c7e-4061-b2cc-e89cf2127de9	60558163-98e7-4575-94d1-258b24312072	2025-07-30	53	26	26	1	1	2025-07-30 08:56:17.162042
d8aef10e-4239-4c69-804f-d6bd51d5b005	ccd78705-bcce-4fea-aabd-af9d69a732c3	2025-07-30	38	33	5	0	0	2025-07-30 08:38:48.19702
15436454-99c7-481b-9472-cf204a0f4681	35d68865-4f2a-4096-a124-c503681546c8	2025-07-30	3	3	0	0	0	2025-07-30 08:38:47.767703
6780aba7-c2c8-4ca1-b3fd-16b3dd8f1a9d	23d5d960-e258-48c8-9c8d-78ff55646dfe	2025-07-30	34	20	12	2	1	2025-07-30 08:38:47.865883
a4887cf4-f39a-4d27-a4c7-3a566d049d65	175b0a77-c19b-400e-89b8-f143fb4e541f	2025-07-30	48	30	18	0	0	2025-07-30 08:38:47.738868
fa45ced1-9b42-4f17-b25a-5068bd9b556f	eaa2e58d-9aae-461d-b8cd-70d3bef51f72	2025-07-30	35	21	11	3	0	2025-07-30 08:38:47.958373
40dab441-d00b-43b2-9ecd-b34e3e7dd8c4	bc20bb78-f46b-4d85-9715-528f67624219	2025-07-30	37	24	13	0	0	2025-07-30 08:38:47.946253
50e2fe29-32f9-4793-b2f5-ceb2be0b284c	02b5fab4-88ea-4a9c-a7b2-1bfaa14e7bbc	2025-07-30	79	57	22	0	0	2025-07-30 08:38:47.596836
a2f208ca-b424-48ce-a71b-1ccaa089b0ce	4ad99624-56e8-45ca-bee2-4404f36418cf	2025-07-30	39	24	15	0	0	2025-07-30 08:38:47.718534
b2fb608b-701d-4766-b64c-5ce8785172e1	2db2ba6b-0867-4a6b-ad9d-8ccbe9fe4c26	2025-07-30	45	36	9	0	0	2025-07-30 08:38:48.213254
3c38d489-1d78-466d-8037-644c73e5137c	f36ba9f6-0b62-4138-8a53-1c0b0b0f908d	2025-07-30	19	19	0	0	1	2025-07-30 08:38:48.134422
244d7f15-4300-4c1e-a9b2-e4d0ee99e182	b9404122-e3ba-4556-b047-1a818de8563f	2025-07-30	89	68	19	2	1	2025-07-30 08:38:47.700723
fccb5f83-ed66-406a-8ee4-fc9b4ee2d7e3	a931db00-3c42-4c92-83a0-62a409bd8767	2025-07-30	31	15	15	1	0	2025-07-30 08:38:47.909146
9d4e3409-dba4-474f-923c-f14baf699936	83046fb6-ed99-42c0-9e1a-b2f1d6648279	2025-07-30	55	45	10	0	0	2025-07-30 08:38:47.90598
e001d378-9aa4-4305-842f-1f891054cc01	d50c6385-1dc5-475f-a8fb-451881c9c716	2025-07-30	126	109	16	1	0	2025-07-30 08:38:48.03754
6abe6427-3abb-4f3f-ac4a-213729d3e5ba	d67f73d1-5205-46fa-b0e3-a9ec97612e93	2025-07-30	30	24	6	0	0	2025-07-30 08:38:47.828834
be5e7dba-91c7-46f5-9a68-29311456a070	470f521a-bb65-4bf9-bf79-3458953ce692	2025-07-30	49	33	14	2	0	2025-07-30 08:38:47.799544
20904038-4ca2-4229-a924-3d52afdffc10	c2f6c7be-ecef-48d2-b41b-dc26e84b1923	2025-07-30	45	41	4	0	1	2025-07-30 08:38:48.169314
99e393e4-9e67-48c2-b0c4-5046bd6d0808	8b048c59-8456-46a6-8456-2025af836d1a	2025-07-30	47	41	5	1	0	2025-07-30 08:38:48.158022
f4c13524-3f85-4fb7-9c58-7a9b52dfe37e	f6d50422-1bb9-4986-968d-0f317fad1307	2025-07-30	45	28	17	0	0	2025-07-30 08:38:48.168404
62f9e2da-6339-4715-a3aa-e89321035c16	44fcc231-c561-4033-9a69-bd76463c2be6	2025-07-30	17	11	5	1	0	2025-07-30 08:38:47.179336
df9844bc-ee77-4dbf-b40b-f0914250f75b	8b328b80-b670-4bb4-aef9-252091d9971d	2025-07-30	51	39	11	1	0	2025-07-30 08:38:47.878003
a8814a62-8bf5-4e40-8d37-ac3b25f880eb	b8535a47-eaba-4a85-acc5-819dc3ea2c79	2025-07-30	84	54	30	0	0	2025-07-30 08:38:48.59489
e0936a20-dd11-4960-a6e6-d24fb27f17dc	ca3e44b8-ae5d-45ad-b3c3-8329d2eafa1e	2025-07-30	42	40	2	0	1	2025-07-30 08:38:49.21574
2d7c4063-2ad3-4c29-8d56-d580c99acb7d	77730508-65ec-4f52-90f3-dee14849807f	2025-07-30	4	2	2	0	0	2025-07-30 08:56:17.65736
fd42c26c-2e94-48ea-81d8-27a308498490	c74b701c-b6bc-48b4-b786-834fe6c3d869	2025-07-30	211	114	88	9	0	2025-07-30 08:38:48.253024
4a6af9b7-666f-429d-a847-c57487e408e2	6bdc8bfe-527f-472b-82e3-92bee65b0e5a	2025-07-30	113	80	33	0	1	2025-07-30 08:58:07.263798
2f6b6c61-ca76-4192-ae98-47fa7a341a3d	ef8e2de7-164c-43ef-a966-ac6f26a60f6b	2025-07-30	7	6	1	0	0	2025-07-30 08:56:18.102849
f09ea77a-53af-4f2d-b058-315c1e9def45	e56134f3-a7b0-462c-a7b6-4072bf416f13	2025-07-30	53	43	9	1	0	2025-07-30 08:38:48.159009
8592dceb-5308-4b9f-a67f-b9daa7f898df	8591790e-46f8-4e51-9c8f-7b2452298de6	2025-07-30	52	28	23	1	0	2025-07-30 08:38:47.815325
7d766064-021c-4cc4-9f8b-eb62bb2fa1e8	20126993-4b0d-416b-ad9d-c8297602495a	2025-07-30	121	74	42	5	0	2025-07-30 08:38:47.745931
06c76b1c-a57a-47a6-85ea-3c2a019bebd6	ef5ea6da-4d8f-4a97-a872-573758efe738	2025-07-30	34	27	7	0	0	2025-07-30 08:38:48.259133
31871661-6ced-4059-b9fd-126fa8f07611	d5896721-2d2e-4e6f-b914-cf50962714c3	2025-07-30	56	49	7	0	0	2025-07-30 08:38:47.836176
02245069-1d0d-431d-8e41-66e146f1124b	0d823894-0176-495c-87ce-20097a583321	2025-07-30	125	52	70	3	0	2025-07-30 08:56:17.083956
db66d1ae-a650-4a34-9453-142dcadd7c2d	a1888b67-a17f-403b-bb95-2035ed1399c1	2025-07-30	43	29	14	0	0	2025-07-30 08:56:17.608499
f775a774-ee3e-498e-9268-0a3373bd756c	d08d4384-3e25-4720-8ea5-3480c70e2e69	2025-07-30	35	20	14	1	0	2025-07-30 08:38:48.331901
c6ca35ac-0cec-4c3f-8032-00e6e129753b	ef61c9a4-b055-4a18-a903-0d4ab61e57ba	2025-07-30	39	30	9	0	0	2025-07-30 08:38:47.786771
8219a3cf-acf8-4214-95b0-0c58fe5c533e	053febaa-804e-43bc-a606-f0b32bb2519c	2025-07-30	134	85	47	2	0	2025-07-30 08:38:48.229738
88cba5d4-e8f6-4df6-a7bf-5e326fa9276a	532105ae-a70a-4037-85a6-ec87861b40f3	2025-07-30	187	125	61	1	0	2025-07-30 08:38:48.668838
8e871e27-2951-4bd1-a68e-4c4e713ac94c	80fb9e6a-28bc-4b1a-b71d-c4d176e11aab	2025-07-30	47	34	11	2	0	2025-07-30 08:38:48.13763
64589816-c596-4106-9352-0765fa4863ef	a3a47539-0c42-4449-b242-150dffa9c114	2025-07-30	46	29	17	0	0	2025-07-30 08:38:48.401803
b02984b9-797c-4d42-a341-cb104130b8da	b523e283-136b-48aa-8813-3d6ab91dea3a	2025-07-30	21	12	8	1	0	2025-07-30 08:38:48.526464
0af9515a-5bcf-494a-8411-be25231845f8	6705ebf8-fe1a-4196-a98d-95d6471e6d03	2025-07-30	133	101	30	2	0	2025-07-30 08:38:48.73284
0b808637-9b54-40d5-adc2-6d3a624a618d	a6b28c11-a2f3-45dd-b629-0b802b75acb4	2025-07-30	45	29	16	0	0	2025-07-30 08:58:06.645155
949027fd-bd77-4e6f-9c5e-edac0ec521f5	c63b26a1-b257-43e7-911c-4fdd34a905e4	2025-07-30	58	46	12	0	0	2025-07-30 08:38:48.238715
0c557963-2bd0-49ac-a061-5acbf9944244	b230f1fc-6f85-40a6-bb08-3626cf97d982	2025-07-30	70	58	11	1	0	2025-07-30 08:58:07.209824
91a37d3e-e3ed-4589-95f3-3df8f932e749	ea804269-6e81-4a19-8778-c9de2c3b7976	2025-07-30	69	54	15	0	0	2025-07-30 08:38:48.19168
7a457b03-1f4b-42bf-8fd1-396f3d65b374	69c9a9e2-7af3-40f9-bd03-289af1b1b8b4	2025-07-30	0	0	0	0	0	2025-07-30 08:38:48.314321
5bdac074-6767-459d-99e8-b920031d53fe	f3f7bb88-76dc-4475-a6f4-c84f3824e83b	2025-07-30	33	20	13	0	0	2025-07-30 08:38:47.72421
432d4d3c-ce0f-4507-a0e1-d2b0fd95eca6	0885f3b5-4d34-41b1-b4c1-ed1aefe689c8	2025-07-30	77	56	18	3	0	2025-07-30 08:38:47.733567
10cbd4f2-f3d2-4ea6-9c9f-4ca509c03e2c	05dcabff-6f0d-44e5-ae0c-bc4c04c25393	2025-07-30	37	21	14	2	0	2025-07-30 08:38:47.778299
7f89fcd3-be18-4c22-9edf-c376f7b9f5fc	2a4b7a15-8d01-4046-a203-018a12aa6fd3	2025-07-30	77	43	32	2	0	2025-07-30 08:56:17.935335
f39f0620-5a2b-42ce-a4e1-348bb2b473ed	94b7fcd1-7763-4505-968b-62f4e19c6017	2025-07-30	57	50	6	1	0	2025-07-30 08:38:48.425736
fdf2b4ed-4da3-42b7-b8af-3d6bfd499062	44210e81-937a-423b-a477-eda3bbdbb542	2025-07-30	70	54	16	0	1	2025-07-30 08:56:17.093107
3deee6d6-3ce3-46c1-86ef-8c656e90f447	3015cacc-2887-41c4-9ebb-581d9a212692	2025-07-30	31	21	10	0	0	2025-07-30 08:58:07.222628
4cd2286c-4f2b-4fae-a4f2-8270282e4528	83f7619c-a0c2-4056-906d-3c464140ce49	2025-07-30	31	29	2	0	0	2025-07-30 08:38:48.468615
1883cd99-3eff-48b9-a3fe-5c6705c240cc	b3d7a07a-e398-403c-a06e-6fef9a1098d9	2025-07-30	25	19	5	1	0	2025-07-30 08:56:19.038841
b5fbf0dd-ddc9-4083-814f-6db8c6ffe885	ef867ef9-7255-4d78-a85a-1e78ff45433a	2025-07-30	50	45	4	1	0	2025-07-30 08:38:48.305913
481a6414-6eb9-47b6-b98e-1afa13f3f146	7c5d12f0-dd76-4c75-abff-8c6c07e7bde2	2025-07-30	152	67	74	11	0	2025-07-30 08:58:06.649655
e13f6ab7-98a8-4037-b53c-2fb3b7f04c1d	bf9260c6-b2ad-45ca-b823-08ec14a09d77	2025-07-30	46	43	3	0	0	2025-07-30 08:38:48.276019
13eb943f-4781-458f-98d3-47d9ac685603	7cf11203-440f-4569-bbcc-16e0c3433dc1	2025-07-30	121	73	45	3	0	2025-07-30 08:56:17.516183
55062d95-6b47-4afb-9379-6851dc8e3c43	33932a5f-3799-48f8-bd10-44a045e89761	2025-07-30	54	42	12	0	0	2025-07-30 08:56:17.585916
737fc2fd-d636-41be-8fdf-ddb079a8b544	78d1f1ea-bc42-461f-88ad-1025c3dabe36	2025-07-30	89	75	14	0	0	2025-07-30 08:38:48.328605
31d95c70-d862-48ea-bc36-673250828fd9	87a78f59-ec4f-4b05-8aae-d92406db0021	2025-07-30	42	37	5	0	0	2025-07-30 08:38:47.909038
bed9191d-1423-4711-b1db-d36255ab6b83	e78cc876-136f-4257-a040-2311fb75d4e3	2025-07-30	22	14	8	0	0	2025-07-30 08:38:48.261131
de0eccdb-9c6a-467f-b0e5-107fd9809053	775e4461-3ef1-4594-8607-cb51264172fe	2025-07-30	44	33	10	1	0	2025-07-30 08:38:48.161331
5ecba353-9c7e-4109-8797-341d38f1f184	ea9e6245-2398-4659-b4a3-3f9617bc39b6	2025-07-30	46	39	5	2	0	2025-07-30 08:56:17.590031
810f7c66-274b-455f-ba12-2a5b2246e9cb	f7fe0d4c-e827-458e-b029-eb3705c01ba6	2025-07-30	31	27	3	1	0	2025-07-30 08:38:48.704033
e4c9477b-846c-4192-ac78-4fd467664ae7	325b2116-87c3-445d-ae3e-40e172488390	2025-07-30	24	21	3	0	0	2025-07-30 08:38:47.897079
04491bc9-ac9d-4027-9602-0255a894a510	4446a050-c281-4919-baf3-b9ae0448a9b5	2025-07-30	117	97	19	1	4	2025-07-30 08:56:17.093603
2f04b9d9-5d71-4645-8d40-32f99ae02e0e	6ff56caa-ded0-4ff4-9fd6-e297bf38df3b	2025-07-30	193	127	61	5	0	2025-07-30 08:56:18.01209
829a08e0-95d4-4f2d-bb65-0c883630ed92	4eb5aca4-eb8f-48f6-a342-07e9b227d252	2025-07-30	52	27	23	2	0	2025-07-30 08:56:17.651776
0e28cfa6-22a8-42c0-8c84-ad981c61c1b8	19920cf9-aa64-4b86-91be-2c7001af4617	2025-07-30	52	47	5	0	0	2025-07-30 08:56:17.813128
0ef9b673-63b3-4337-9bee-e1e7c4c88caa	4d3fc523-4dce-44a7-bf58-4d392a6abc61	2025-07-30	37	26	9	2	0	2025-07-30 08:38:48.981306
8c2c1442-4197-4b5a-a9c1-eef0bfc2b26d	eadeba07-0194-41e5-ba13-14fd857df779	2025-07-30	75	53	20	2	0	2025-07-30 08:38:48.476264
6cfab47e-0b36-45ab-b16a-3be2dd168cef	fcb7dc8b-003f-4a50-b39d-9c76adc7c957	2025-07-30	26	18	7	1	2	2025-07-30 08:38:48.311217
6167591f-e897-45a7-a971-45cd66e5c3c1	226a20bc-b490-4a83-9275-2060f17f6dcb	2025-07-30	45	34	11	0	1	2025-07-30 08:38:48.423778
e2a17ee3-4c85-4f41-be99-be25f3ab2198	ef70c523-bc49-4476-a822-b9a4e02faf1b	2025-07-30	89	52	35	2	0	2025-07-30 08:38:47.76561
8487c41a-bc10-44bd-83f3-0af4d6afa395	eefc776d-f821-46d5-b42b-ff3124549b26	2025-07-30	32	26	5	1	0	2025-07-30 08:56:17.164865
03b284af-c0e0-4f1d-b864-4de2cea1bf23	a7e7d80a-1382-45c5-ac94-de91f4a6a7ae	2025-07-30	62	50	12	0	2	2025-07-30 08:38:49.654909
692af93f-e42c-409f-89d5-5de50345b8cb	c6ae433f-a923-44f5-8836-0efd41d3372c	2025-07-30	30	23	7	0	0	2025-07-30 08:38:48.67202
9217fb0c-94aa-417a-9070-d575c0ff9af5	f885d44f-831d-40b6-b0f6-6dd1db997b96	2025-07-30	39	29	9	1	0	2025-07-30 08:56:17.750503
e3ccdd97-0d2b-4e80-a742-e956f03d05f9	27aa02ae-619c-42c8-92f9-a9487224190d	2025-07-30	72	51	21	0	0	2025-07-30 08:38:47.664045
1eb1cf3c-14c9-4b90-bd90-b699e8ecbe3d	fed9aaca-b863-4357-a17b-eca8afe3d7b4	2025-07-30	33	28	5	0	0	2025-07-30 08:56:17.332805
94447cc4-a7c7-4c2a-97ef-0d2cb871a106	b02c2c63-22d4-428e-8e6e-7d023820b98d	2025-07-30	54	38	16	0	0	2025-07-30 08:38:47.895043
b49e9a49-0525-4f76-a7ee-38384f958a0e	314420cc-781c-4901-bf52-467558af6801	2025-07-30	91	58	33	0	2	2025-07-30 08:38:48.767298
2994b70e-ed1f-46cb-a835-944ce429dbd0	8d955474-d4dd-41a1-b15e-5b8b4a55b2ea	2025-07-30	119	77	41	1	0	2025-07-30 08:56:17.146025
f2e03805-872a-4aa2-ad1f-030e5b99f3ab	0d02061b-b2e3-4b07-9e45-f51a3f017a84	2025-07-30	44	19	25	0	0	2025-07-30 08:58:07.777475
35c3e5d3-44ce-4e73-b549-a05ab539ccb7	10117fbb-d910-4ba3-8163-b150f6d2fc85	2025-07-30	46	42	4	0	0	2025-07-30 08:56:17.271196
5c1e7891-12ec-45f0-8332-684263755d73	d5ea0b5c-28e5-4a26-9456-c689334e7b1b	2025-07-30	55	31	21	3	1	2025-07-30 08:38:48.589431
2317a668-7eaa-4288-8a13-d5462e67d7bb	64bb0d09-5d8f-4dc7-adbf-3195483e6eef	2025-07-30	132	76	53	3	0	2025-07-30 08:38:48.734248
2e11f2c5-d33c-476c-80da-b31fef70d5e5	23334269-d111-46d9-a795-8005907f8ea7	2025-07-30	86	39	41	6	0	2025-07-30 08:38:48.81507
03ed92b4-f99e-4b04-8d30-f5dd03b21ba7	bc33191e-2292-454b-82f6-34d965b5e8a0	2025-07-30	46	38	8	0	0	2025-07-30 08:38:48.312938
afd2b52d-1d81-4303-ade3-669925ff9f10	ac32c466-4a79-42e7-83c5-52488ac1eb73	2025-07-30	46	27	19	0	0	2025-07-30 08:56:17.317136
23b9e570-5c42-411a-90d8-c82a4f3601a4	eddc341e-e2a4-45f7-b880-19e75f2d3948	2025-07-30	110	87	21	2	0	2025-07-30 08:38:47.817385
d3a0eb50-d9d8-4f72-9b98-99bb2dde635b	970ca8d3-0221-48f5-a1ff-a41ddd080bb3	2025-07-30	95	59	33	3	0	2025-07-30 08:38:47.873938
1034661f-14ee-4fb0-9158-bfb714e6c660	a654af61-5fb9-488e-9b80-02af4d2ed99d	2025-07-30	103	63	40	0	0	2025-07-30 08:38:48.539823
05cf71af-8e53-4ccf-9a7b-4df2b53fad9f	435fa24d-fbe6-4e18-9086-af6fe2e71548	2025-07-30	204	115	81	8	0	2025-07-30 08:58:08.328904
a5251014-16ed-4662-a874-847b8e504037	f0fd7903-2297-43a0-900d-ca15c22da343	2025-07-30	6	3	3	0	0	2025-07-30 08:38:48.610824
b3ccde23-a7be-43d9-b0f1-57987d31f46f	b93cc8c7-ef3e-4edf-af25-4e02e5ac8ac6	2025-07-30	28	23	5	0	0	2025-07-30 08:38:47.743661
c1763d46-aeea-4360-a366-cddbfd141da1	e9f448a2-6e79-472a-b54a-3e2b7227732e	2025-07-30	37	32	5	0	0	2025-07-30 08:38:49.873736
3d45f75c-d609-4279-a970-573c898eff64	25ff7510-3171-4819-8142-8f057a823f9f	2025-07-30	117	64	49	4	1	2025-07-30 08:56:17.20522
dd7978d4-2afc-4fe1-8e26-1d7ab5ece3cb	f2f72e23-354f-4f57-8aa8-39d644c6b5df	2025-07-30	24	18	5	1	0	2025-07-30 08:58:08.38647
e2e36163-0f8f-475e-b7ad-89eae256f2f9	44f5a7ad-9ad9-4b92-abf7-281d6a82fa61	2025-07-30	11	11	0	0	0	2025-07-30 08:56:18.908164
ca2cc741-6891-4a2d-9d23-e4eec0097204	239c7649-391f-4600-aa6d-1670223123fc	2025-07-30	73	50	23	0	0	2025-07-30 08:38:48.67446
3ccb57dd-e4f0-44c9-9b00-248af78c789b	eede2fb3-5b57-4d19-b2ce-3d519daadcde	2025-07-30	99	46	48	5	0	2025-07-30 08:56:17.342494
323f03a6-8ccf-48d9-8870-df07bc95db01	848c6bcb-71f3-47bd-8d0f-7100d128c7da	2025-07-30	93	77	15	1	0	2025-07-30 08:38:48.04324
39e8c03d-2753-4273-8461-f2427038a43e	820f69cd-a8af-43b0-b22e-810faf872cf7	2025-07-30	42	35	7	0	0	2025-07-30 08:38:48.165439
fae25f7a-3704-4500-9f06-f4fd60c5afb3	0e08463b-6820-49a4-9d5d-f51155e8126a	2025-07-30	37	20	13	4	0	2025-07-30 08:38:48.964296
b2d68f55-d465-41cb-a1a2-3e65b44f47f0	cb9ef1ab-3ce1-4fe5-98be-345037cffe6c	2025-07-30	108	75	33	0	0	2025-07-30 08:38:48.461066
186e426c-f407-4475-8ffc-8f83d91c3242	14a31dce-9b45-489c-8f63-828b9923c998	2025-07-30	115	79	36	0	0	2025-07-30 08:56:17.037414
fb426314-da8a-46b3-9c38-c910c6d9c555	a015d1c5-ac09-48bb-80f3-285f2777ff16	2025-07-30	62	32	30	0	0	2025-07-30 08:38:48.608002
6e623e96-09f3-41d4-9e8c-0cd10831ef36	19d43931-8406-4ba9-8b68-fada97d63aae	2025-07-30	32	29	3	0	0	2025-07-30 08:56:17.217046
a17fc2f1-ce75-4986-b6f9-1d6c2255ee3c	0ca5a38c-a24e-4748-937e-8c2a06585b35	2025-07-30	52	32	17	3	0	2025-07-30 08:58:08.417556
813469af-1e36-4f35-b3cf-910daafececc	e1a1cd3a-cea3-49a6-ad3a-85ead7ed4e5d	2025-07-30	47	43	4	0	0	2025-07-30 08:38:48.677156
c3a844f0-cc7f-4231-b457-c76da678d5e9	153d9800-632d-4ef7-a8b0-0cbbdec511ac	2025-07-30	39	27	12	0	0	2025-07-30 08:38:49.655261
b135c585-891d-4951-b49f-55421eded7df	580bce8c-5cd2-4986-96ec-3dd320e7a6b9	2025-07-30	96	67	28	1	0	2025-07-30 08:56:18.138277
b90b2ece-3b11-4943-9595-197cf6bce3fe	022e7727-d91a-47bb-95fd-fe95e3d77d75	2025-07-30	43	41	2	0	0	2025-07-30 08:38:49.116337
305f6c29-f75b-4824-803d-b94de93e07ff	35ff41ae-29dd-46d5-ae85-169fddc74a6b	2025-07-30	2	1	1	0	0	2025-07-30 08:38:47.621487
8ffe0295-f499-4ab7-8eb0-aae299b0e132	cc687455-958c-463f-b335-d5e3f526bf30	2025-07-30	100	55	44	1	0	2025-07-30 08:38:48.116532
027cb335-b591-4318-bd29-669b4eaa41d5	953c988b-ab8d-4bf9-ba5a-cc5aa249c8e7	2025-07-30	45	29	15	1	0	2025-07-30 08:38:47.983271
43ac5ef8-ab13-4ace-921a-77ebc0c13134	2740e2f0-01fe-4175-92d3-d4f828905671	2025-07-30	30	24	5	1	0	2025-07-30 08:56:18.174977
15d0a845-ba2a-4737-9462-0aaaf34ffa08	454ac5c3-2602-4d87-9b9f-3cd31002d4f8	2025-07-30	16	10	6	0	0	2025-07-30 08:38:47.785556
1697369f-c15e-4736-a5f8-0cc63e1b3077	c4cf1f8f-446e-455a-84c6-948fee323d45	2025-07-30	69	52	16	1	1	2025-07-30 08:56:17.503173
be3dba8f-d2fc-4a9d-a8ce-ce583d4a1606	04116f10-07bb-4f95-94f6-509aeeeff813	2025-07-30	62	50	12	0	0	2025-07-30 08:56:17.59363
3a7bb093-666a-4062-bfae-92085d5f5829	e47fa29e-70aa-4119-a537-916f4ddaac9c	2025-07-30	45	31	12	2	0	2025-07-30 08:38:46.65518
87677685-3197-4a10-9bf7-2f42a10b2f3d	dd80d19f-b9d1-4799-9d56-cca95b09a4c1	2025-07-30	87	58	28	1	0	2025-07-30 08:38:48.197694
3846f502-428f-449a-9785-9b152733c06e	5a5bde23-a062-4155-9807-c12817b2eb2a	2025-07-30	32	24	8	0	0	2025-07-30 08:38:47.480983
986b5cb3-c78f-4591-beea-a1cbef7a7716	bbbaba44-2eeb-40f7-8a30-532fc65f500c	2025-07-30	3	2	1	0	0	2025-07-30 08:38:47.723747
535b1b7f-012a-4b84-9fa6-4a6d6cfe6374	622f043b-16f0-473d-a310-a1ad5ff077fd	2025-07-30	52	44	7	1	0	2025-07-30 08:38:48.071002
6f03e7ca-dfee-4c3b-a37a-051b75fdd9fc	f1f6826b-ca51-4021-a000-76f09967280c	2025-07-30	17	10	7	0	0	2025-07-30 08:56:17.624635
9180460b-eabc-409c-9461-eb49ca1590c7	b5ff51f7-41ef-4095-bd3e-a5f7764e1622	2025-07-30	57	49	8	0	0	2025-07-30 08:56:17.89428
0fc15527-5711-4970-82e3-f74808725665	383480b0-52ce-4ea6-ab74-ac8fcbeb43bc	2025-07-30	57	38	16	3	0	2025-07-30 08:38:47.907312
01b79f25-ae20-44bb-97bd-27bb87510ad9	26847339-13af-44dc-af64-66d28f3dd0be	2025-07-30	72	52	19	1	0	2025-07-30 08:38:47.715981
ba15c3f2-9273-4284-bc98-79bbd6991bdd	5ec77900-b11b-4f73-86ef-bbcfe78091c0	2025-07-30	255	145	96	14	0	2025-07-30 08:38:48.03622
6f09e44b-5c85-44e8-b74d-fbfa7b7b8544	9787009a-50fc-4691-9c71-f689f0267e78	2025-07-30	100	50	46	4	0	2025-07-30 08:38:49.370196
ab5c9902-7438-46c3-a749-e7ca9644c27e	de20d8ed-2ee2-4305-8689-3b1e2097d08f	2025-07-30	53	48	5	0	0	2025-07-30 08:38:48.115093
68e1734b-07cf-4198-bea2-33e71b45d002	4daaac39-4f0e-4f1a-a91e-e88c8ee566cb	2025-07-30	48	39	7	2	0	2025-07-30 08:38:49.746383
e05b3e9a-ad97-4735-b73e-4cb3bd970ebf	25da5cb1-3c7f-4853-99ab-78a19d145255	2025-07-30	142	92	50	0	0	2025-07-30 08:56:17.528569
7a57e629-67b6-4a6e-a310-1ef9bba0ece4	74682f71-5d10-473d-884d-78af141f0e77	2025-07-30	57	34	19	4	0	2025-07-30 08:56:17.6553
50d09148-84d4-46c9-99f8-e7cb44d4895c	fa0c1651-a329-44d6-a09e-b58a05c294b7	2025-07-30	16	14	2	0	0	2025-07-30 08:56:17.992604
1b7feb14-11c4-49d9-a964-a7462a2fba9d	4840b9aa-aaed-4b15-8f7d-d1bf586289b9	2025-07-30	55	47	8	0	0	2025-07-30 08:56:18.496218
\.


--
-- Data for Name: public_dashboards; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.public_dashboards (id, student_id, public_url, is_enabled, view_count, last_viewed_at, created_at) FROM stdin;
\.


--
-- Data for Name: student_submissions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.student_submissions (id, student_id, problem_title, problem_url, difficulty, topic_tags, screenshot_url, status, submitted_at, verified_at, verified_by) FROM stdin;
\.


--
-- Data for Name: student_topic_mastery; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.student_topic_mastery (id, student_id, topic_tag_id, problems_solved, total_problems, mastery_percentage, last_updated) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.students (id, name, leetcode_username, leetcode_profile_link, created_at) FROM stdin;
e47fa29e-70aa-4119-a537-916f4ddaac9c	Aaditya Raj	aadi2532	https://leetcode.com/u/aadi2532/	2025-07-30 08:36:33.28283
94b7fcd1-7763-4505-968b-62f4e19c6017	Abhishek Singh	Abhishek_2008	https://leetcode.com/u/Abhishek_2008/	2025-07-30 08:36:33.764238
953c988b-ab8d-4bf9-ba5a-cc5aa249c8e7	Aditya	Aadi_Singh_28	https://leetcode.com/u/Aadi_Singh_28/	2025-07-30 08:36:34.238484
83046fb6-ed99-42c0-9e1a-b2f1d6648279	Ajit Yadav	Ajit_Yadav_2908	https://leetcode.com/u/Ajit_Yadav_2908/	2025-07-30 08:36:34.713474
8b328b80-b670-4bb4-aef9-252091d9971d	Akanksha	Akanksha_kushwaha_a	https://leetcode.com/u/Akanksha_kushwaha_a/	2025-07-30 08:36:35.186814
bc20bb78-f46b-4d85-9715-528f67624219	Alok Raj	alok-work23	https://leetcode.com/u/alok-work23/	2025-07-30 08:36:35.660764
f0fd7903-2297-43a0-900d-ca15c22da343	Aman Verma	aman1640	https://leetcode.com/u/aman1640/	2025-07-30 08:36:36.135299
b396227e-2ba0-4728-8882-8ff919c20f6c	Aman Singh	AmanSinghSitare	https://leetcode.com/u/AmanSinghSitare/	2025-07-30 08:36:36.611065
44fcc231-c561-4033-9a69-bd76463c2be6	Aman Adarsh	amanadarsh1168	https://leetcode.com/u/amanadarsh1168/	2025-07-30 08:36:37.084238
5a5bde23-a062-4155-9807-c12817b2eb2a	Amit Kumar	Amit_Kumar13	https://leetcode.com/u/Amit_Kumar13/	2025-07-30 08:36:37.556128
175b0a77-c19b-400e-89b8-f143fb4e541f	Anamika Kumari	tanamika	https://leetcode.com/u/tanamika/	2025-07-30 08:36:38.029815
35ff41ae-29dd-46d5-ae85-169fddc74a6b	Anand Singh	of0DUuvBjV	https://leetcode.com/u/of0DUuvBjV/	2025-07-30 08:36:38.509372
c74b701c-b6bc-48b4-b786-834fe6c3d869	Anand Kumar Pandey	Anand_Pandey123	https://leetcode.com/u/Anand_Pandey123/	2025-07-30 08:36:38.981848
bc33191e-2292-454b-82f6-34d965b5e8a0	Anoop kumar	Anoop_kumar123	https://leetcode.com/u/Anoop_kumar123/	2025-07-30 08:36:39.454668
f3f7bb88-76dc-4475-a6f4-c84f3824e83b	Anshu Kumar	CodebyAnshu03	https://leetcode.com/u/CodebyAnshu03/	2025-07-30 08:36:39.930475
e66edec9-ab5b-465b-b8dc-b28ec7b46117	Anuradha Tiwari	anuradha_45	https://leetcode.com/u/anuradha_45/	2025-07-30 08:36:40.403553
dd80d19f-b9d1-4799-9d56-cca95b09a4c1	Anushri Mishra	Anushri_Mishra	https://leetcode.com/u/Anushri_Mishra/	2025-07-30 08:36:40.87694
f6d50422-1bb9-4986-968d-0f317fad1307	Aradhya patel	aradhya789	https://leetcode.com/u/aradhya789/	2025-07-30 08:36:41.349043
eddc341e-e2a4-45f7-b880-19e75f2d3948	Arjun Kadam	arjunkadampatil	https://leetcode.com/u/arjunkadampatil/	2025-07-30 08:36:41.821892
b8535a47-eaba-4a85-acc5-819dc3ea2c79	Arpita Tripathi	Uny60jPJeO	https://leetcode.com/u/Uny60jPJeO/	2025-07-30 08:36:42.29399
bbbaba44-2eeb-40f7-8a30-532fc65f500c	Arun kumar	Arun_404notfound	https://leetcode.com/u/Arun_404notfound/	2025-07-30 08:36:42.767078
d50c6385-1dc5-475f-a8fb-451881c9c716	Aryan Saini	aryan8773	https://leetcode.com/u/aryan8773/	2025-07-30 08:36:43.239175
ca3e44b8-ae5d-45ad-b3c3-8329d2eafa1e	Ashwin yadav	ashwin-tech	https://leetcode.com/u/ashwin-tech/	2025-07-30 08:36:43.714809
d67f73d1-5205-46fa-b0e3-a9ec97612e93	Ayush Kumar	Ayush4Sony	https://leetcode.com/u/Ayush4Sony/	2025-07-30 08:36:44.661967
820f69cd-a8af-43b0-b22e-810faf872cf7	Ayush Kumar Yadav	Ayush_Yadav_029	https://leetcode.com/u/Ayush_Yadav_029/	2025-07-30 08:36:45.140206
970ca8d3-0221-48f5-a1ff-a41ddd080bb3	Bhagwati	Bhagwati323	https://leetcode.com/u/Bhagwati323/	2025-07-30 08:36:45.612567
a931db00-3c42-4c92-83a0-62a409bd8767	Bhaskar Mahato	bhaskarmahato03	https://leetcode.com/u/bhaskarmahato03/	2025-07-30 08:36:46.086026
ef61c9a4-b055-4a18-a903-0d4ab61e57ba	Byagari Praveen Kumar	Mr_bpk_4433	https://leetcode.com/u/Mr_bpk_4433/	2025-07-30 08:36:46.565296
239c7649-391f-4600-aa6d-1670223123fc	Challa Trivedh Kumar	TrivedhChalla	https://leetcode.com/u/TrivedhChalla/	2025-07-30 08:36:47.045231
eaa2e58d-9aae-461d-b8cd-70d3bef51f72	Chandan Giri	WelcomeGseries	https://leetcode.com/u/WelcomeGseries/	2025-07-30 08:36:47.519035
80fb9e6a-28bc-4b1a-b71d-c4d176e11aab	Chiranjeet Biswas	Chiranjeet_Biswas	https://leetcode.com/u/Chiranjeet_Biswas/	2025-07-30 08:36:47.992218
a3a47539-0c42-4449-b242-150dffa9c114	Debangsu Misra	debangsumisra	https://leetcode.com/u/debangsumisra/	2025-07-30 08:36:48.465393
35d68865-4f2a-4096-a124-c503681546c8	Deepak Mandal	AlgoMandal	https://leetcode.com/u/AlgoMandal/	2025-07-30 08:36:48.939499
4d3fc523-4dce-44a7-bf58-4d392a6abc61	Dilip Vaishnav	Dilip_Vaishnav_07	https://leetcode.com/u/Dilip_Vaishnav_07/	2025-07-30 08:36:49.414252
226a20bc-b490-4a83-9275-2060f17f6dcb	Dilip Suthar	Dilip0552	https://leetcode.com/u/Dilip0552/	2025-07-30 08:36:49.890142
ef70c523-bc49-4476-a822-b9a4e02faf1b	Disha Sahu	Disha-01-alt	https://leetcode.com/u/Disha-01-alt/	2025-07-30 08:36:50.362063
022e7727-d91a-47bb-95fd-fe95e3d77d75	Divyanshi Sahu	ADHIINSVY13	https://leetcode.com/u/ADHIINSVY13/	2025-07-30 08:36:50.834042
2db2ba6b-0867-4a6b-ad9d-8ccbe9fe4c26	Divyanshi Rathour	Divyanshirathour	https://leetcode.com/u/Divyanshirathour/	2025-07-30 08:36:51.307576
c63b26a1-b257-43e7-911c-4fdd34a905e4	Ekta kumari	EktaSaw1212	https://leetcode.com/u/EktaSaw1212/	2025-07-30 08:36:51.781598
02b5fab4-88ea-4a9c-a7b2-1bfaa14e7bbc	Gaurav Rathore	Gaurav_rathore96	https://leetcode.com/u/Gaurav_rathore96/	2025-07-30 08:36:52.25416
c6ae433f-a923-44f5-8836-0efd41d3372c	Gaurav kumar	gaurav_vvv	https://leetcode.com/u/gaurav_vvv/	2025-07-30 08:36:52.729876
b523e283-136b-48aa-8813-3d6ab91dea3a	Gaurav Tiwari	gauravtiwari_70	https://leetcode.com/u/gauravtiwari_70/	2025-07-30 08:36:53.203004
848c6bcb-71f3-47bd-8d0f-7100d128c7da	Guman Singh Rajpoot	Guman_singh_rajpoot	https://leetcode.com/u/Guman_singh_rajpoot/	2025-07-30 08:36:53.679742
b9404122-e3ba-4556-b047-1a818de8563f	Harisingh Rajpoot	HarisinghRaj	https://leetcode.com/u/HarisinghRaj/	2025-07-30 08:36:54.155991
9787009a-50fc-4691-9c71-f689f0267e78	Harsh Chourasiya	harshchourasiya295	https://leetcode.com/u/harshchourasiya295/	2025-07-30 08:36:54.632407
bf9260c6-b2ad-45ca-b823-08ec14a09d77	Harshit Chaturvedi	thisharshit	https://leetcode.com/u/thisharshit/	2025-07-30 08:36:55.106529
ccd78705-bcce-4fea-aabd-af9d69a732c3	Himanshu kumar	ansraaz86	https://leetcode.com/u/ansraaz86/	2025-07-30 08:36:55.580324
64bb0d09-5d8f-4dc7-adbf-3195483e6eef	Himanshu Srivastav	codeCrafter777	https://leetcode.com/u/codeCrafter777/	2025-07-30 08:36:56.053934
de20d8ed-2ee2-4305-8689-3b1e2097d08f	Himanshu Kanwar Chundawat	himanshu_chundawat	https://leetcode.com/u/himanshu_chundawat/	2025-07-30 08:36:56.530674
e56134f3-a7b0-462c-a7b6-4072bf416f13	Hirak Nath	hirak__	https://leetcode.com/u/hirak__/	2025-07-30 08:36:57.003369
470f521a-bb65-4bf9-bf79-3458953ce692	Hiranya Patil	hiranya_patil	https://leetcode.com/u/hiranya_patil/	2025-07-30 08:36:57.476852
053febaa-804e-43bc-a606-f0b32bb2519c	Ishant Bhoyar	Ishant_57	https://leetcode.com/u/Ishant_57/	2025-07-30 08:36:57.950687
f36ba9f6-0b62-4138-8a53-1c0b0b0f908d	Jagriti Pandey	jagriti_Pandey01	https://leetcode.com/u/jagriti_Pandey01/	2025-07-30 08:36:58.423867
8591790e-46f8-4e51-9c8f-7b2452298de6	Jamal Akhtar	kKJ7y7Q9Ks	https://leetcode.com/u/kKJ7y7Q9Ks/	2025-07-30 08:36:58.895862
cc687455-958c-463f-b335-d5e3f526bf30	Janu Chaudhary	Janu_Chaudhary	https://leetcode.com/u/Janu_Chaudhary/	2025-07-30 08:36:59.372623
eadeba07-0194-41e5-ba13-14fd857df779	KARANPAL SINGH RANAWAT	krtechie	https://leetcode.com/u/krtechie/	2025-07-30 08:36:59.844991
ea804269-6e81-4a19-8778-c9de2c3b7976	khushi Narwariya	khushi_narwariya	https://leetcode.com/u/khushi_narwariya/	2025-07-30 08:37:00.31828
b93cc8c7-ef3e-4edf-af25-4e02e5ac8ac6	Lakhan Rathore	Lakhan_rathore	https://leetcode.com/u/Lakhan_rathore/	2025-07-30 08:37:00.792677
454ac5c3-2602-4d87-9b9f-3cd31002d4f8	Maneesh Sakhwar	Maneesh_Sakhwar	https://leetcode.com/u/Maneesh_Sakhwar/	2025-07-30 08:37:01.269105
d5896721-2d2e-4e6f-b914-cf50962714c3	Mani Kumar	MANIKUMAR7109	https://leetcode.com/u/MANIKUMAR7109/	2025-07-30 08:37:01.744855
83f7619c-a0c2-4056-906d-3c464140ce49	Manish Chhaba	Chhaba_Manish	https://leetcode.com/u/Chhaba_Manish/	2025-07-30 08:37:02.218855
5ec77900-b11b-4f73-86ef-bbcfe78091c0	Manish Kumar Tiwari	manish__45	https://leetcode.com/u/manish__45/	2025-07-30 08:37:02.693293
0885f3b5-4d34-41b1-b4c1-ed1aefe689c8	Manoj Kharkar	manojk909	https://leetcode.com/u/manojk909/	2025-07-30 08:37:03.165526
a7e7d80a-1382-45c5-ac94-de91f4a6a7ae	Manoj Dewda	Manoj_Dewda022	https://leetcode.com/u/Manoj_Dewda022/	2025-07-30 08:37:03.639391
314420cc-781c-4901-bf52-467558af6801	Mausam kumari	Mausam-kumari	https://leetcode.com/u/Mausam-kumari/	2025-07-30 08:37:04.113467
e78cc876-136f-4257-a040-2311fb75d4e3	Mayank Raj	mayankRajRay	https://leetcode.com/u/mayankRajRay/	2025-07-30 08:37:04.589488
a1a4e95a-8c12-4af6-87d1-65e8815b58bb	Mehtab Alam	Alam-e-mehtab	https://leetcode.com/u/alamehtab/	2025-07-30 08:37:05.063316
b8dc81d3-8bab-47c6-a290-272b2786cfe9	Mohammad Afzal Raza	Afzl_Raza	https://leetcode.com/u/Afzal_Raza/	2025-07-30 08:37:05.537939
4ad99624-56e8-45ca-bee2-4404f36418cf	MOHD MONIS	codemon-07	https://leetcode.com/u/codemon-07/	2025-07-30 08:37:06.009732
e9f448a2-6e79-472a-b54a-3e2b7227732e	Mohit Sharma	sharma_Mohit_2005	https://leetcode.com/u/sharma_Mohit_2005/	2025-07-30 08:37:06.482494
d5ea0b5c-28e5-4a26-9456-c689334e7b1b	Moirangthem Joel Singh	JoelMoirangthem	https://leetcode.com/u/JoelMoirangthem/	2025-07-30 08:37:06.955944
b02c2c63-22d4-428e-8e6e-7d023820b98d	Monu Rajpoot	Monurajpoot	https://leetcode.com/u/Monurajpoot/	2025-07-30 08:37:07.429672
153d9800-632d-4ef7-a8b0-0cbbdec511ac	N.Arun Kumar	Arunkumar087	https://leetcode.com/u/Arunkumar087/	2025-07-30 08:37:07.902332
a015d1c5-ac09-48bb-80f3-285f2777ff16	Neeraj Parmar	Neeru888	https://leetcode.com/u/Neeru888/	2025-07-30 08:37:08.375251
0fcbb1b1-a2da-4a26-b50f-b608ded73741	Nidhi Kumari	Nid-Singh	https://leetcode.com/u/Nid_Singh/	2025-07-30 08:37:08.848903
ef5ea6da-4d8f-4a97-a872-573758efe738	NIKHIL Chaurasiya	Rdxnikhil	https://leetcode.com/u/Rdxnikhil/	2025-07-30 08:37:09.320906
78d1f1ea-bc42-461f-88ad-1025c3dabe36	Nikhil Kumar Mehta	Nikhil_KM_04	https://leetcode.com/u/Nikhil_KM_04/	2025-07-30 08:37:09.798339
710b6c2d-53c0-4ba8-80a8-83545c29509d	Nirmal Kumar	Bardx	https://leetcode.com/u/r2GUlBuyLZ/	2025-07-30 08:37:10.271231
fcb7dc8b-003f-4a50-b39d-9c76adc7c957	Nirmal Mewada	nirmal_M01	https://leetcode.com/u/nirmal_M01/	2025-07-30 08:37:10.743912
23d5d960-e258-48c8-9c8d-78ff55646dfe	Ompal Yadav	om_codes1	https://leetcode.com/u/om_codes1/	2025-07-30 08:37:11.215941
26847339-13af-44dc-af64-66d28f3dd0be	Pawan Kushwah	pawankushwah	https://leetcode.com/u/pawankushwah/	2025-07-30 08:37:11.690092
c2f6c7be-ecef-48d2-b41b-dc26e84b1923	Pinky Rana	ranapink398	https://leetcode.com/u/ranapink398/	2025-07-30 08:37:12.162215
775e4461-3ef1-4594-8607-cb51264172fe	Pooran Singh	pooransingh01	https://leetcode.com/u/pooransingh01/	2025-07-30 08:37:12.634924
27aa02ae-619c-42c8-92f9-a9487224190d	Prabhat Patidar	Prabhat7987	https://leetcode.com/u/Prabhat7987/	2025-07-30 08:37:13.111077
20126993-4b0d-416b-ad9d-c8297602495a	Prachi Dhakad	prachiDhakad	https://leetcode.com/u/prachiDhakad/	2025-07-30 08:37:13.58437
a654af61-5fb9-488e-9b80-02af4d2ed99d	Pragati Chauhan	Chauhan_Pragati	https://leetcode.com/u/Chauhan_Pragati/	2025-07-30 08:37:14.060739
d08d4384-3e25-4720-8ea5-3480c70e2e69	Pranjal Dubey	Pranjal428	https://leetcode.com/u/Pranjal428/	2025-07-30 08:37:14.533533
4daaac39-4f0e-4f1a-a91e-e88c8ee566cb	Prem Kumar	prem2450	https://leetcode.com/u/prem2450/	2025-07-30 08:37:15.010883
0e08463b-6820-49a4-9d5d-f51155e8126a	Prem Shankar Kushwaha	PCodex9	https://leetcode.com/u/PCodex9/	2025-07-30 08:37:15.485232
87a78f59-ec4f-4b05-8aae-d92406db0021	Prerana Rajnag	preranarajnag	https://leetcode.com/u/preranarajnag/	2025-07-30 08:37:15.958429
cb9ef1ab-3ce1-4fe5-98be-345037cffe6c	Priya Saini	Priya_saini2004	https://leetcode.com/u/Priya_saini2004/	2025-07-30 08:37:16.431671
6705ebf8-fe1a-4196-a98d-95d6471e6d03	Priyadarshi Kumar	iPriyadarshi	https://leetcode.com/u/iPriyadarshi/	2025-07-30 08:37:16.904202
ef867ef9-7255-4d78-a85a-1e78ff45433a	Pushpraj singh	Pushpraj_DSA	https://leetcode.com/u/Pushpraj_DSA/	2025-07-30 08:37:17.378639
05dcabff-6f0d-44e5-ae0c-bc4c04c25393	Rahul Kumar	rahu48	https://leetcode.com/u/rahu48/	2025-07-30 08:37:17.852262
8b048c59-8456-46a6-8456-2025af836d1a	Rahul Kumar Verma	RahulVermaji	https://leetcode.com/u/RahulVermaji/	2025-07-30 08:37:18.324738
e1a1cd3a-cea3-49a6-ad3a-85ead7ed4e5d	Rajeev Yadav	kn1gh7t	https://leetcode.com/u/kn1gh7t/	2025-07-30 08:37:18.796733
622f043b-16f0-473d-a310-a1ad5ff077fd	Rajiv Kumar	rajiv1478	https://leetcode.com/u/rajiv1478/	2025-07-30 08:37:19.271823
239487bb-7b7c-458a-8064-29412f0627db	Rakshita K Biradar	Rakshita_K_Biradar	https://leetcode.com/u/RakshitaKBiradar/	2025-07-30 08:37:19.744041
23334269-d111-46d9-a795-8005907f8ea7	Ramraj Nagar	Ramrajnagar	https://leetcode.com/u/Ramrajnagar/	2025-07-30 08:37:20.221825
532105ae-a70a-4037-85a6-ec87861b40f3	Rani Kumari	123_Rani	https://leetcode.com/u/123_Rani/	2025-07-30 08:37:20.695908
69c9a9e2-7af3-40f9-bd03-289af1b1b8b4	Ranjeet kumar yadav	Ranjeet_kumar	https://leetcode.com/u/DL6FbStsPL/	2025-07-30 08:37:21.168396
f7fe0d4c-e827-458e-b029-eb3705c01ba6	Ravi Mourya	MouryaRavi	https://leetcode.com/u/6G3TE2HiE0/	2025-07-30 08:37:21.640852
383480b0-52ce-4ea6-ab74-ac8fcbeb43bc	Ravi Rajput	RAVI-RAJPUT-UMATH	https://leetcode.com/u/RAVI-RAJPUT-UMATH/	2025-07-30 08:37:22.114591
325b2116-87c3-445d-ae3e-40e172488390	Ritesh jha	RITESH12JHA24	https://leetcode.com/u/RITESH12JHA24/	2025-07-30 08:37:22.587049
14a31dce-9b45-489c-8f63-828b9923c998	Ritik Singh	Ritik_Singh_2311	https://leetcode.com/u/Ritik_Singh_2311/	2025-07-30 08:55:47.052931
19920cf9-aa64-4b86-91be-2c7001af4617	Rohit Malviya	RohitMelasiya	https://leetcode.com/u/RohitMelasiya/	2025-07-30 08:55:47.529658
2c2bc53a-d64f-4f59-b59b-447f9aad27c1	Rohit Kumar	rkprasad959508	https://leetcode.com/u/rkprasad90600/	2025-07-30 08:55:47.993615
ef8e2de7-164c-43ef-a966-ac6f26a60f6b	Sajan Kumar	Sajan_kumar45	https://leetcode.com/u/Sajan_kumar45/	2025-07-30 08:55:48.460231
7cf11203-440f-4569-bbcc-16e0c3433dc1	Samina Sultana	Samina_Sultana	https://leetcode.com/u/Samina_Sultana/	2025-07-30 08:55:48.925789
f1f6826b-ca51-4021-a000-76f09967280c	Sandeep Kumar	sandeepsinu79	https://leetcode.com/u/sandeepsinu79/	2025-07-30 08:55:49.394796
4840b9aa-aaed-4b15-8f7d-d1bf586289b9	Sandhya Kaushal	Sandhya_Kaushal	https://leetcode.com/u/Sandhya_Kaushal/	2025-07-30 08:55:49.861625
eede2fb3-5b57-4d19-b2ce-3d519daadcde	Sandhya Parmar	Sandhya_Parmar	https://leetcode.com/u/Sandhya_Parmar/	2025-07-30 08:55:50.327755
ea9e6245-2398-4659-b4a3-3f9617bc39b6	Sarthaksuman Mishra	sarthak-26	https://leetcode.com/u/sarthak-26/	2025-07-30 08:55:50.794018
60558163-98e7-4575-94d1-258b24312072	Satish Mahto	kr_satish	https://leetcode.com/u/kr_satish/	2025-07-30 08:55:51.26098
19d43931-8406-4ba9-8b68-fada97d63aae	Saurabh Bisht	bocchi_277	https://leetcode.com/u/bocchi_277/	2025-07-30 08:55:51.727767
b3d7a07a-e398-403c-a06e-6fef9a1098d9	Shahid Ansari	shahidthisside	https://leetcode.com/u/shahidthisside/	2025-07-30 08:55:52.192818
4eb5aca4-eb8f-48f6-a342-07e9b227d252	Shalini Priya	Shalini_Priya29	https://leetcode.com/u/Shalini_Priya29/	2025-07-30 08:55:52.660028
0d823894-0176-495c-87ce-20097a583321	Shilpi shaw	shilpishaw	https://leetcode.com/u/shilpishaw/	2025-07-30 08:55:53.125863
44210e81-937a-423b-a477-eda3bbdbb542	Shivam Shukla	itz_shuklajii	https://leetcode.com/u/itz_shuklajii/	2025-07-30 08:55:53.591001
ac32c466-4a79-42e7-83c5-52488ac1eb73	Shivam Shukla	shivamm-shukla	https://leetcode.com/u/shivamm-shukla/	2025-07-30 08:55:54.056021
eefc776d-f821-46d5-b42b-ff3124549b26	Shivang Dubey	Shivangdubey9	https://leetcode.com/u/Shivangdubey9/	2025-07-30 08:55:54.530343
8d955474-d4dd-41a1-b15e-5b8b4a55b2ea	Shlok Gupta	shlokg62	https://leetcode.com/u/shlokg62/	2025-07-30 08:55:54.996215
4446a050-c281-4919-baf3-b9ae0448a9b5	Shreyank Sthavaramath	shreyank_s	https://leetcode.com/u/shreyank_s/	2025-07-30 08:55:55.461821
a1888b67-a17f-403b-bb95-2035ed1399c1	Shubham Kang	Shubham_Kang	https://leetcode.com/u/Shubham_Kang/	2025-07-30 08:55:55.926304
33932a5f-3799-48f8-bd10-44a045e89761	Sneha Shaw	Sneha6289	https://leetcode.com/u/Sneha6289/	2025-07-30 08:55:56.392203
2a4b7a15-8d01-4046-a203-018a12aa6fd3	Sunny Kumar	sunny_kumar_1	https://leetcode.com/u/sunny_kumar_1/	2025-07-30 08:55:56.858235
580bce8c-5cd2-4986-96ec-3dd320e7a6b9	Surveer Singh Rao	Surveer686	https://leetcode.com/u/Surveer686/	2025-07-30 08:55:57.326391
6ff56caa-ded0-4ff4-9fd6-e297bf38df3b	Swati Kumari	Swati_Kumari_142	https://leetcode.com/u/Swati_Kumari_142/	2025-07-30 08:55:57.793115
25ff7510-3171-4819-8142-8f057a823f9f	Suyash Yadav	yadavsuyash723	https://leetcode.com/u/yadavsuyash723/	2025-07-30 08:55:58.257815
f885d44f-831d-40b6-b0f6-6dd1db997b96	Ujjval Baijal	Ujjwal_Baijal	https://leetcode.com/u/Ujjwal_Baijal/	2025-07-30 08:55:58.722065
04116f10-07bb-4f95-94f6-509aeeeff813	Uppara Sai Maithreyi	sai_maithri	https://leetcode.com/u/sai_maithri/	2025-07-30 08:55:59.187219
c4cf1f8f-446e-455a-84c6-948fee323d45	Vinay Kumar	Vinay_Prajapati	https://leetcode.com/u/Vinay_Prajapati/	2025-07-30 08:55:59.652387
59cdcde5-2ed5-46ca-adde-8ac15bb28ce9	Tamnna parveen	Tamnnaparveen	https://leetcode.com/u/Tamnnaparvreen/	2025-07-30 08:56:00.117124
44f5a7ad-9ad9-4b92-abf7-281d6a82fa61	Vinay Kumar Gupta	vinay_gupta01	https://leetcode.com/u/vinay_gupta01/	2025-07-30 08:56:00.581938
2740e2f0-01fe-4175-92d3-d4f828905671	Vishal Bhardwaj	vishalbhardwaj123	https://leetcode.com/u/vishalbhardwaj123/	2025-07-30 08:56:01.049174
fed9aaca-b863-4357-a17b-eca8afe3d7b4	Vishal Kumar	kumar_vishal_01	https://leetcode.com/u/kumar_vishal_01/	2025-07-30 08:56:01.515495
77730508-65ec-4f52-90f3-dee14849807f	Vivek Kumar	its_vivek_001	https://leetcode.com/u/its_vivek_001/	2025-07-30 08:56:01.981487
10117fbb-d910-4ba3-8163-b150f6d2fc85	Vivek kumar	vivek_75	https://leetcode.com/u/vivek_75/	2025-07-30 08:56:02.450508
25da5cb1-3c7f-4853-99ab-78a19d145255	Yuvraj Chirag	Yuvraj_Chirag	https://leetcode.com/u/Yuvraj_Chirag/	2025-07-30 08:56:02.921049
b5ff51f7-41ef-4095-bd3e-a5f7764e1622	Yuvraj Singh Bhati	yuvrajsinghbhati01	https://leetcode.com/u/yuvrajsinghbhati01/	2025-07-30 08:56:03.386231
fa0c1651-a329-44d6-a09e-b58a05c294b7	Naman Damami	namandamami	https://leetcode.com/u/namandamami/	2025-07-30 08:56:03.854622
74682f71-5d10-473d-884d-78af141f0e77	Ajay jatav	Ajayjatav	https://leetcode.com/u/AjayJatav/	2025-07-30 08:56:04.32286
435fa24d-fbe6-4e18-9086-af6fe2e71548	Aman Singh	Aman_Singh_Sitare	https://leetcode.com/u/Aman_Singh_Sitare/	2025-07-30 08:57:17.679854
6bdc8bfe-527f-472b-82e3-92bee65b0e5a	Anuradha Tiwari	anuradha_24	https://leetcode.com/u/anuradha_24/	2025-07-30 08:57:19.803522
a6b28c11-a2f3-45dd-b629-0b802b75acb4	Mehtab Alam	alamehtab	https://leetcode.com/u/alamehtab/	2025-07-30 08:57:32.090262
3015cacc-2887-41c4-9ebb-581d9a212692	Mohammad Afzal Raza	Afzal_Raza	https://leetcode.com/u/Afzal_Raza/	2025-07-30 08:57:32.563935
7c5d12f0-dd76-4c75-abff-8c6c07e7bde2	Nidhi Kumari	Nid_Singh	https://leetcode.com/u/Nid_Singh/	2025-07-30 08:57:34.466938
b230f1fc-6f85-40a6-bb08-3626cf97d982	Rakshita K Biradar	RakshitaKBiradar	https://leetcode.com/u/RakshitaKBiradar/	2025-07-30 08:57:40.127118
f2f72e23-354f-4f57-8aa8-39d644c6b5df	Rohit Kumar	rkprasad90600	https://leetcode.com/u/rkprasad90600/	2025-07-30 08:57:42.487194
0d02061b-b2e3-4b07-9e45-f51a3f017a84	Nirmal Kumar	r2GUlBuyLZ	https://leetcode.com/u/r2GUlBuyLZ/	2025-07-30 08:57:52.407556
0ca5a38c-a24e-4748-937e-8c2a06585b35	Tamnna parveen	Tamnnaparvreen	https://leetcode.com/u/Tamnnaparvreen/	2025-07-30 08:57:53.879323
\.


--
-- Data for Name: topic_tags; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.topic_tags (id, name, description, color, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, password, role, student_id, is_active, last_login_at, created_at) FROM stdin;
3cdfdffb-fbe9-408a-ae72-96d734d8e11b	aadi2532	$2b$10$hWzNrNa1P8HnZ8zHR6lcp.ItbFFEi6NpPZRWQACh3UeH7MZCwEkre	student	e47fa29e-70aa-4119-a537-916f4ddaac9c	t	\N	2025-07-30 08:37:27.709511
26b337d0-9855-4528-adb4-791e5473c7d7	Abhishek_2008	$2b$10$0qvPvfPMBZ3HhtShtT0OuuYnHl8SkdsrNHKNNdV0wIC5/UopUIQ1W	student	94b7fcd1-7763-4505-968b-62f4e19c6017	t	\N	2025-07-30 08:37:28.259426
d1afc9c7-b3ed-4f66-941f-cd95927202b2	Aadi_Singh_28	$2b$10$3uyMk17bboERjT3I7Qm7PexnLwgXiXWxpAQyDFVZvrpr3sgMVG4j6	student	953c988b-ab8d-4bf9-ba5a-cc5aa249c8e7	t	\N	2025-07-30 08:37:28.813526
272d1a53-e15b-4784-a309-31e1dc9c11ec	Ajit_Yadav_2908	$2b$10$H.HGE5TkX58vbpUIuKjf/udR/8lVUjKsHLsmusf3E8teRLKm4wN.e	student	83046fb6-ed99-42c0-9e1a-b2f1d6648279	t	\N	2025-07-30 08:37:29.393416
314026b4-cc30-4f7e-939e-0c8e021c0616	Akanksha_kushwaha_a	$2b$10$qOLn7oWvmjmAr6FvYsF9auMZl2Od/HNgdyIdnKXFe81GOxgBSkjfe	student	8b328b80-b670-4bb4-aef9-252091d9971d	t	\N	2025-07-30 08:37:29.981365
2ae26b32-35a5-4781-a16e-4118b6c0f0c5	alok-work23	$2b$10$/UJkr5pnIZBShoZ0miiOrewOjAxv0pR8n12hzCPYvkmQvoqjqbg1W	student	bc20bb78-f46b-4d85-9715-528f67624219	t	\N	2025-07-30 08:37:30.535346
9a396044-e207-4df3-a089-1acf2af832ff	aman1640	$2b$10$bqoSUIvnV28cvCzgOP0pAuE3oTTHfPUdPiPpi0j0ZtX/wkHnsQ4WK	student	f0fd7903-2297-43a0-900d-ca15c22da343	t	\N	2025-07-30 08:37:31.090309
bdcd0211-0b8b-42ca-8a17-32143473a65c	AmanSinghSitare	$2b$10$phoMFMHTlMX/hpzYY6YXuudbhY4a91YAt9MygN.NL1sUkZg04Bsta	student	b396227e-2ba0-4728-8882-8ff919c20f6c	t	\N	2025-07-30 08:37:31.675905
31796a69-1918-4a80-a121-413929e32cb5	amanadarsh1168	$2b$10$op8hv0C5irqyrvcfEPE9EO1qdM.jx3WomhyP1y2dta0uM.zjG5nYC	student	44fcc231-c561-4033-9a69-bd76463c2be6	t	\N	2025-07-30 08:37:32.232758
5843af12-9ec0-4e87-949e-4f420e912a71	Amit_Kumar13	$2b$10$FM2V8i625rlNqUSTLXGXVeVLxqhlNKEbxn06blMtcx.8yZ2W31cNa	student	5a5bde23-a062-4155-9807-c12817b2eb2a	t	\N	2025-07-30 08:37:32.812575
064c5d4b-ae13-473d-8b25-c11640e75250	tanamika	$2b$10$l.bRKCqzjNDwkt5cOho9IeYav2Hqd9CmfdD3KLQ8QFpztQU31f.rW	student	175b0a77-c19b-400e-89b8-f143fb4e541f	t	\N	2025-07-30 08:37:33.392496
f9e8df7a-92e9-4f33-9475-ee192637293f	of0DUuvBjV	$2b$10$REk.uAaL9.I0hk94FBvqsOVQC39fpkStFNj/HIbIw63NE2g4xkslW	student	35ff41ae-29dd-46d5-ae85-169fddc74a6b	t	\N	2025-07-30 08:37:33.977165
14e0e1c4-2011-46f5-b4f9-067684e9b21b	Anand_Pandey123	$2b$10$sVfwDWX5mOhAbLC9nJevwek6oGD2I/lJ1gz8OEisaWBfpMFPc/msK	student	c74b701c-b6bc-48b4-b786-834fe6c3d869	t	\N	2025-07-30 08:37:34.5575
e533f0c0-d4e1-4a10-83f0-c05451a789da	Anoop_kumar123	$2b$10$7jQvLyL907stEVqo0VKPd.s9Y7KXe1CzT9cT36/112gGZhmhxdPzS	student	bc33191e-2292-454b-82f6-34d965b5e8a0	t	\N	2025-07-30 08:37:35.111999
6921c2ed-4452-499d-9e54-510ed1f1da49	CodebyAnshu03	$2b$10$5mNJGJYvbhZLMFjS2K18VOQNto67DXwoAW5Gmws4JiHRJeRpto5Li	student	f3f7bb88-76dc-4475-a6f4-c84f3824e83b	t	\N	2025-07-30 08:37:35.691416
06a5a78d-bc64-4cd1-86e9-1754b53a7d00	anuradha_45	$2b$10$/Epmt3Zd/sXjWaYSo08eZ.ZkJzjauBDb4tLS0.C2t3lyM00E2boOe	student	e66edec9-ab5b-465b-b8dc-b28ec7b46117	t	\N	2025-07-30 08:37:36.254415
d8957e3b-9770-43c6-a1e9-48f38eaf38bd	Anushri_Mishra	$2b$10$jGFFHFuq4GKJz627fmxb2eTdbbvIvdTTqqwnAVr5ktybaeWZxWD7C	student	dd80d19f-b9d1-4799-9d56-cca95b09a4c1	t	\N	2025-07-30 08:37:36.833345
8df8e2a2-5518-425a-9b6d-953f5cb8d50c	aradhya789	$2b$10$ZOdDzJNiOY712sUVtV40y.7Hm45sve45mAu6KCg84XQkd.xEs2Zle	student	f6d50422-1bb9-4986-968d-0f317fad1307	t	\N	2025-07-30 08:37:37.38414
2fa23ce9-023f-44fb-9b66-66b7b2485f77	arjunkadampatil	$2b$10$SUJowhEmbBNzhD3kWQdHteOPnbFxu1pKdWcMof.POMGiuqkbskMLG	student	eddc341e-e2a4-45f7-b880-19e75f2d3948	t	\N	2025-07-30 08:37:37.930422
744df244-718b-42cf-a0e5-62dc69b32cfb	Uny60jPJeO	$2b$10$PxyxrXJDeeI1n5.y3WRds.24JvvL1OGRTyYEwEi895mkqTzTUmVFC	student	b8535a47-eaba-4a85-acc5-819dc3ea2c79	t	\N	2025-07-30 08:37:38.479854
6ffc481a-b51f-42e4-a5e9-5252e98fdeb8	Arun_404notfound	$2b$10$gOlMNTQguQCOvh9it.iwc.oMNlG2qylK10PgMpK2VncTRRW1Wt9SS	student	bbbaba44-2eeb-40f7-8a30-532fc65f500c	t	\N	2025-07-30 08:37:39.034519
090035a5-7e70-4d52-9834-987c94b03b4b	aryan8773	$2b$10$bL.dGUaJFtaOlqPbCo2pl.WnAfDvSb7mhhzArFKfpiXO5NVTljd7i	student	d50c6385-1dc5-475f-a8fb-451881c9c716	t	\N	2025-07-30 08:37:39.584601
2b9bc6d5-06e8-4b98-b905-d3e76dde1aa8	ashwin-tech	$2b$10$gfGQSwD0eK7y9O3cRLNaxeolBzfEdKus63gTkYvAQ/pXlHbJrvf76	student	ca3e44b8-ae5d-45ad-b3c3-8329d2eafa1e	t	\N	2025-07-30 08:37:40.142292
c16ab53e-fe8a-4263-bcca-5b87320b2d57	Ayush4Sony	$2b$10$UUuR0ehyXCGxT04.0986heyLuqUYaizz08YCK8w4hgQHdPhjaH/Gy	student	d67f73d1-5205-46fa-b0e3-a9ec97612e93	t	\N	2025-07-30 08:37:40.692497
a5690dd1-6e1d-433c-a197-aad452fe254a	Ayush_Yadav_029	$2b$10$6uPJaOpQseZ/GblMd9kkf.BMXDXuhrsOUbYrWQXpJp0MulNpw2/ZK	student	820f69cd-a8af-43b0-b22e-810faf872cf7	t	\N	2025-07-30 08:37:41.24585
e135ff73-f521-4702-b595-fccc0d2e7f51	Bhagwati323	$2b$10$AYPGn6uKYN2r6j.E1RYeK.yn8Bf5CYUf9EtTaI4VVO9BJ3ej.ImJW	student	970ca8d3-0221-48f5-a1ff-a41ddd080bb3	t	\N	2025-07-30 08:37:41.795586
4e605e6f-50db-4446-86b6-8a6b75c53bf3	bhaskarmahato03	$2b$10$g1jCJnopk8oAPXfIZRHi8.3Ws8Gt2Gj9.A00QIe2WWjo.Z3xy/rlK	student	a931db00-3c42-4c92-83a0-62a409bd8767	t	\N	2025-07-30 08:37:42.350711
9daca750-bd11-4298-b5f2-2c934f092e01	Mr_bpk_4433	$2b$10$WtaIG/5eIBpdGGZJ9BGTnuNpx2IwSLYjiL1OJ/q8dQPN.DufyUrs2	student	ef61c9a4-b055-4a18-a903-0d4ab61e57ba	t	\N	2025-07-30 08:37:42.90132
73107da5-f458-4391-a437-3d0c9c30316c	TrivedhChalla	$2b$10$S8yLBzmLVb4PCsAtVtRuJO2G.MefH8gxFCIP1foquuciXgewHOeYa	student	239c7649-391f-4600-aa6d-1670223123fc	t	\N	2025-07-30 08:37:43.452386
c047a861-be4c-4c70-abec-c5dab6cb27ae	WelcomeGseries	$2b$10$qDSDmLBbfZabZ3E8oyAewuUl2AWppWaC4jUdf5Hh7D/PPFByAtX4G	student	eaa2e58d-9aae-461d-b8cd-70d3bef51f72	t	\N	2025-07-30 08:37:44.003053
a1859df3-82c4-4863-9a20-6905dd6a73fc	Chiranjeet_Biswas	$2b$10$qUcQheGqOenxCFI7JtJNl.ehotlaNEj0NnpDBKs/risXcMVR9t7qy	student	80fb9e6a-28bc-4b1a-b71d-c4d176e11aab	t	\N	2025-07-30 08:37:44.583471
a6bf2a20-cc73-432a-98c2-ac94ad1e63ee	debangsumisra	$2b$10$PyapqJZvPWQX0lg/NLcnGe6AuXxvHiiIq8JTz542pCTmsrvF6QdlC	student	a3a47539-0c42-4449-b242-150dffa9c114	t	\N	2025-07-30 08:37:45.134172
8f79315f-ec6f-41b9-b2f3-131acbc82d84	AlgoMandal	$2b$10$/oW1nLi7xr/DDywxiLcth.23i01kDHERvT4ptNK61bRV.nyPCYrT6	student	35d68865-4f2a-4096-a124-c503681546c8	t	\N	2025-07-30 08:37:45.681516
bf0f5c2c-b0b9-4b42-8e1c-fd3741e47414	Dilip_Vaishnav_07	$2b$10$mEvgAkemKz.5NPNaFA13iOgm4bTnWKuoUZ8LgNoN5gzkLbjT2fh1e	student	4d3fc523-4dce-44a7-bf58-4d392a6abc61	t	\N	2025-07-30 08:37:46.258639
6171878c-52a6-4c4a-9bff-90ee4c3c5414	Dilip0552	$2b$10$nKz3DSrdWwfZkootucQVKeShxocAPzQu8QwmQ7lpDFJJi.SHQmc0e	student	226a20bc-b490-4a83-9275-2060f17f6dcb	t	\N	2025-07-30 08:37:46.808293
1df9f4f4-7076-490a-a562-6ddeab7caec6	Disha-01-alt	$2b$10$gJqp0wdEBauCl.DvLFO2N.AGtGeRa3SgPFClR7dKiiyjLf/biG.DW	student	ef70c523-bc49-4476-a822-b9a4e02faf1b	t	\N	2025-07-30 08:37:47.359891
f9ba3801-c328-4828-ab61-10798bbe1cfd	ADHIINSVY13	$2b$10$fhTklhha2oVVM2dnsDf4k.8tvMcvrmPAfLLk2UwQKW5edV146qKAm	student	022e7727-d91a-47bb-95fd-fe95e3d77d75	t	\N	2025-07-30 08:37:47.91221
092caf24-6503-4434-ba2d-eda3dd7cbf1d	Divyanshirathour	$2b$10$s2izPh4QF.YcyYYvRkgD6.5b2cPFKTAFmvYENrkso4XGw0L2U5jZC	student	2db2ba6b-0867-4a6b-ad9d-8ccbe9fe4c26	t	\N	2025-07-30 08:37:48.466299
b1cdc3ba-1991-4067-89f2-ca734d8ed397	EktaSaw1212	$2b$10$MfjGnA7Qy4jYC4B30FOKKeDqPJtoQaFvPj912NY2vzQvBal54d4ci	student	c63b26a1-b257-43e7-911c-4fdd34a905e4	t	\N	2025-07-30 08:37:49.048107
3eff70ca-8e43-445b-92c4-9320cb2d4b79	Gaurav_rathore96	$2b$10$zCMcpncY37C52/ZtWdgGVO6IM1GTAt9qIgjyJr9rYx61Ikd5vW0YW	student	02b5fab4-88ea-4a9c-a7b2-1bfaa14e7bbc	t	\N	2025-07-30 08:37:49.618857
26853ca5-293b-48b8-aa12-25ebf844542b	gaurav_vvv	$2b$10$rpMMclDNPuS71dQgg1k2xuEI.T/tjuL5lGr04fM525giKsTr9UU46	student	c6ae433f-a923-44f5-8836-0efd41d3372c	t	\N	2025-07-30 08:37:50.203756
d65267ed-9205-431f-89b0-cf13157d6d59	gauravtiwari_70	$2b$10$Dd7.cu62gPy7rda0pCdipOF/bfZ/PtZkrilMhSTBu3Rlohd1qewz.	student	b523e283-136b-48aa-8813-3d6ab91dea3a	t	\N	2025-07-30 08:37:50.771849
3b358b6d-2cb4-4454-a35d-3ec13435d49d	Guman_singh_rajpoot	$2b$10$wyOQAEUlfixXSbJp71fKJOXEeRmYtGKCihM9dwfoUEcPhSJAbkUfa	student	848c6bcb-71f3-47bd-8d0f-7100d128c7da	t	\N	2025-07-30 08:37:51.330351
76b7a2ff-a937-4525-a4ee-0839b88bbf8b	HarisinghRaj	$2b$10$6uJZID8Qncr5CDFqNoMZNuShYTDGpoU/rrJFdqvdJjPnF9olxYxhO	student	b9404122-e3ba-4556-b047-1a818de8563f	t	\N	2025-07-30 08:37:51.881812
2ce6a521-2c2f-4ffd-ae0b-1d08af19de14	harshchourasiya295	$2b$10$O2SlO0b8cEYlHAnOqSKjPuWOFwwK22YNYF2SZFayl/0zti16jmPgq	student	9787009a-50fc-4691-9c71-f689f0267e78	t	\N	2025-07-30 08:37:52.430909
8856e6aa-739c-48e5-9c94-5483df27d11e	thisharshit	$2b$10$GhKxM.4mjy6NKgNp2LQwYu69gPJ2wimRdEvj6m/JxQhoMxL6tPeLW	student	bf9260c6-b2ad-45ca-b823-08ec14a09d77	t	\N	2025-07-30 08:37:52.985481
294c981a-1fda-4097-9dd8-90efa2dcdb30	ansraaz86	$2b$10$6Z8QAYZOSEovjDBrporxxevq9gj8DItJOXm2Vt4ieieXWrabTdTWS	student	ccd78705-bcce-4fea-aabd-af9d69a732c3	t	\N	2025-07-30 08:38:09.059074
b89bd8c4-267e-4dad-a2d7-9b2595d9bf9a	codeCrafter777	$2b$10$QiX3DdpaNoZZ4vfoA97m3./qhOSma.gSOyBfNmiXatE66mR9N033G	student	64bb0d09-5d8f-4dc7-adbf-3195483e6eef	t	\N	2025-07-30 08:38:09.631167
4c6f2694-2ee6-40e5-80b4-a5aa679453d7	himanshu_chundawat	$2b$10$gjAbdwCCj38TtfPas4jXDO1.RChNZYLjXOe4VaKvjUa8o5d0sjO0i	student	de20d8ed-2ee2-4305-8689-3b1e2097d08f	t	\N	2025-07-30 08:38:10.19298
c73205d7-2953-4c63-964e-3984bbe5df0d	hirak__	$2b$10$E2Er4KXA9/eF97EZDHrbvenooNy49ct5SqxJ04.OC2q2UFclNw7Je	student	e56134f3-a7b0-462c-a7b6-4072bf416f13	t	\N	2025-07-30 08:38:10.782844
677d3371-b819-4dd6-9b7a-127399f4710d	hiranya_patil	$2b$10$7ewLl..7AKId1lNRbf57B.HslW3aINB9yykrWex6.jSb50s6zIfxW	student	470f521a-bb65-4bf9-bf79-3458953ce692	t	\N	2025-07-30 08:38:11.343839
7ef68344-3924-4540-a561-2d48317ab70e	jagriti_Pandey01	$2b$10$sgfOrpn.WWPBa/VZ7woJ1uKlONrt3kJO/tAM/fyiUUjHyCXdwx9hC	student	f36ba9f6-0b62-4138-8a53-1c0b0b0f908d	t	\N	2025-07-30 08:38:12.451524
93368ef7-41cd-48c5-bba8-662fb2d50969	kKJ7y7Q9Ks	$2b$10$.ozl4PtDSF3ZterS47yk/.MBPPrx3mn.bQI5iOE2mg7NUMHhYfGGG	student	8591790e-46f8-4e51-9c8f-7b2452298de6	t	\N	2025-07-30 08:38:13.007862
cd73b95d-efd0-4417-a9ed-178b572d5f49	Janu_Chaudhary	$2b$10$eeCmE6AOfUOXbNvYdWqUku4q2kOqALM.Jc3im6eiHaLsnfEMtkX6C	student	cc687455-958c-463f-b335-d5e3f526bf30	t	\N	2025-07-30 08:38:13.560001
16217419-7737-4813-b5ee-c2b31dfe6612	krtechie	$2b$10$mbRdH7IRYVI.ATi8Ycg0AeGq0r5alSHVFa8cvDveuWg4mTYUuTAdu	student	eadeba07-0194-41e5-ba13-14fd857df779	t	\N	2025-07-30 08:38:14.128126
7312d6f3-fe6a-4cfd-9f42-0c285ef3d052	khushi_narwariya	$2b$10$drKQdO7e/vbtFg6JUtGQHelRK8LKNpe9ga9LxrdAfYeQaVtQ3BUe2	student	ea804269-6e81-4a19-8778-c9de2c3b7976	t	\N	2025-07-30 08:38:14.682942
aff5f17b-94fd-4d3d-b5b3-134f5e9bc2ce	Lakhan_rathore	$2b$10$3CZudbmvGYtyubs2Wvhzye0fP9tWwKGrxI8BPBUHaVjhEECru4KyS	student	b93cc8c7-ef3e-4edf-af25-4e02e5ac8ac6	t	\N	2025-07-30 08:38:15.237438
e1488f64-b213-4830-8711-160f21effac2	Maneesh_Sakhwar	$2b$10$qf69bZoFrQDTDq2/1zXRS.bY0w885w5wg1rfp1HTw6ytpG/2Yaj1q	student	454ac5c3-2602-4d87-9b9f-3cd31002d4f8	t	\N	2025-07-30 08:38:15.788559
d2006503-efe0-4bc7-a54a-e32601a1851f	MANIKUMAR7109	$2b$10$1yz2/dHVo2cdY19HpIlWRuKTt.bOoAoYKFo6vAfj7rGzna/NH.nmO	student	d5896721-2d2e-4e6f-b914-cf50962714c3	t	\N	2025-07-30 08:38:16.344705
d8086bf7-058c-443e-991a-fb1ae42608f2	Chhaba_Manish	$2b$10$BlCA19OpHLOmHYs/GFadl.8tZiIpOtRUJzSqqU7bzDXtmVnhTpX2q	student	83f7619c-a0c2-4056-906d-3c464140ce49	t	\N	2025-07-30 08:38:16.928917
4f16ef4a-304d-44fb-b74c-cfee2a97d2aa	manish__45	$2b$10$ozVTH5lJchhWFqzHWffk3O23WaaAr26BMKHvVUOzv5Sh6/3FmAxp.	student	5ec77900-b11b-4f73-86ef-bbcfe78091c0	t	\N	2025-07-30 08:38:17.485371
5c0c627e-14e4-4d37-98da-7c97ca15de87	manojk909	$2b$10$SsjqPo5Upp6Ei6onoN6d1OBbQLKGrTjXAVhVLVhA1aChisrbJjLb6	student	0885f3b5-4d34-41b1-b4c1-ed1aefe689c8	t	\N	2025-07-30 08:38:18.037745
e08c7340-5edc-49c4-b4bf-22e4c856e49b	Manoj_Dewda022	$2b$10$Ndq1z1G0dzjM2P.pPSp73Ooag.VwB5YjmKYD7Fa/D3ftV7mDhPdCu	student	a7e7d80a-1382-45c5-ac94-de91f4a6a7ae	t	\N	2025-07-30 08:38:18.588557
37f3fe42-c3f6-41df-a238-b6d773501cab	Mausam-kumari	$2b$10$bQBBrafuWpQiaQEClIalmuq1435Gkk/BsBDYtt8KebRsXIMDQ52le	student	314420cc-781c-4901-bf52-467558af6801	t	\N	2025-07-30 08:38:19.151296
c7a709c3-e378-4cd8-84f9-3708d082b69f	mayankRajRay	$2b$10$1/qUxGxry6XlZhP69m3aG.94LB1AME4EcTiQ1ZKbzqwCXlkjWZdMa	student	e78cc876-136f-4257-a040-2311fb75d4e3	t	\N	2025-07-30 08:38:19.71203
01355468-39d4-4f40-a446-0d3efedae4ee	Alam-e-mehtab	$2b$10$/P3sz14DE1jW/TLx80sOZuHKsi5.0pw..NyZWI91L14PWYYMgNJna	student	a1a4e95a-8c12-4af6-87d1-65e8815b58bb	t	\N	2025-07-30 08:38:20.269089
79cad522-2b58-43df-9b3f-68041d14bf99	Afzl_Raza	$2b$10$7dvH0/k5qnpegvFHBKVuIOu.3z1vahQrOravCDX2WM9vrd5KGBqNq	student	b8dc81d3-8bab-47c6-a290-272b2786cfe9	t	\N	2025-07-30 08:38:20.828147
4cca4875-b5ce-42b8-84bb-3277da71c5bc	codemon-07	$2b$10$gAlrmQDWE.mcQWfphsv3/uAW5c8F9mErxQtRl8ELdeqQsRJ8894US	student	4ad99624-56e8-45ca-bee2-4404f36418cf	t	\N	2025-07-30 08:38:21.394452
d605021f-1540-4fb1-8e52-e2895ff4363a	sharma_Mohit_2005	$2b$10$koSp1dU5ywuLSczAA/SfweWFagGZITiH8YLgNwFHeEMHY17MIA47y	student	e9f448a2-6e79-472a-b54a-3e2b7227732e	t	\N	2025-07-30 08:38:21.980005
5161a936-536f-45d0-b1e5-6c75bb7841a6	JoelMoirangthem	$2b$10$WpB4Bt7tgbtK7vmKZ7k3zO37diy7a.fqQJ5SQs1.YY8cgxfoNKAN2	student	d5ea0b5c-28e5-4a26-9456-c689334e7b1b	t	\N	2025-07-30 08:38:22.570396
5ec780cd-fabd-4813-a5c5-dd5c9a41c431	Monurajpoot	$2b$10$spcuE5HRb214JFrVY/8b8uJzRlZEX7XH1r26nwGp/vMi9zNd.khc2	student	b02c2c63-22d4-428e-8e6e-7d023820b98d	t	\N	2025-07-30 08:38:23.126311
38b1a7cc-7d84-43f7-a279-d2793610d2c5	Arunkumar087	$2b$10$Vd8CA7weMahpnjbeOdthEOYNR5otIAzjtQB/Md1rq/aMpwdPGalfO	student	153d9800-632d-4ef7-a8b0-0cbbdec511ac	t	\N	2025-07-30 08:38:23.712354
84d26cb9-da26-4cbf-8e61-18fcbf5c8428	Neeru888	$2b$10$ctcGOzjhOXr4gMF2UNgs.eCosoU1bfoUcJhdwJcO4MhcCJtlEHis2	student	a015d1c5-ac09-48bb-80f3-285f2777ff16	t	\N	2025-07-30 08:38:24.269827
cf7d63cb-8013-4a00-ad19-f4044f09f1b5	Nid-Singh	$2b$10$IVwyk9l1pJX132cpykqBoe3RncWJP9UaR1hr764kDY20wFM4Krr7C	student	0fcbb1b1-a2da-4a26-b50f-b608ded73741	t	\N	2025-07-30 08:38:24.853308
9558efa1-e58d-4abe-931a-8ecd808d8529	Rdxnikhil	$2b$10$kxCr3n/Uy4rIZO.Eh0EoF.LUX7H5c9LAJswgCvxuq5Bah4mj2wKLS	student	ef5ea6da-4d8f-4a97-a872-573758efe738	t	\N	2025-07-30 08:38:25.402868
7b12abe9-cf7f-46b3-9a73-d6ef2aa2d07d	Nikhil_KM_04	$2b$10$M8/95lH371UEQ0zuDBZ/Yenv7INdyQUibVxNNk/MsSxpv2AbmH/S.	student	78d1f1ea-bc42-461f-88ad-1025c3dabe36	t	\N	2025-07-30 08:38:25.957244
c90e678f-fa3f-47c3-a32a-804b8e237441	Bardx	$2b$10$H7zPKeHzg9PVl.Fkw0ci2.FQlbdlX9c7FKDtvqDcLJr6gdpSKAPdG	student	710b6c2d-53c0-4ba8-80a8-83545c29509d	t	\N	2025-07-30 08:38:26.519114
7ba1353c-19e8-43ff-beb6-52f1c7286046	nirmal_M01	$2b$10$4SNSqMo4TTO.g.6y230CYO/ov41p8VVjZzAfi3pUKf4igP9khC1be	student	fcb7dc8b-003f-4a50-b39d-9c76adc7c957	t	\N	2025-07-30 08:38:27.077508
f48da53c-4a0c-41bb-8297-7ec32d04eba8	om_codes1	$2b$10$uwxOKLjUo6PfMT9x93/sqOXoGtUxK4vjILIbAAnjhn50QuGii67He	student	23d5d960-e258-48c8-9c8d-78ff55646dfe	t	\N	2025-07-30 08:38:27.661875
029d162e-43be-49ef-8133-7d4a43d9d109	pawankushwah	$2b$10$yUtYt2BUG6Elf1cM2RgQBuUSuw9kP4TgJevoqKQ5ev1JiUe2Lx4vC	student	26847339-13af-44dc-af64-66d28f3dd0be	t	\N	2025-07-30 08:38:28.220701
db56f70b-d605-4348-a198-8e3226f802fc	ranapink398	$2b$10$YzyuHgB0/NQt5xKuqrFY8.oFMkfZIYkGjsmO20r3ZhmawjL8sWKYK	student	c2f6c7be-ecef-48d2-b41b-dc26e84b1923	t	\N	2025-07-30 08:38:28.774773
e5fcca71-d0b7-4ec6-9617-73d7be5b4234	pooransingh01	$2b$10$ZbMJ0y0iyVMrm4fbLI/5IerbQbs6rSFmmnqONfdqYhv5lY2I50MRi	student	775e4461-3ef1-4594-8607-cb51264172fe	t	\N	2025-07-30 08:38:29.326877
54c64bcc-33ce-49ea-a676-06f0e6abb7d3	Prabhat7987	$2b$10$aIW5ug05H/ajdEJTDv2xROPeQbb1bgefUc8wRH.ug9EjkazFVCx2C	student	27aa02ae-619c-42c8-92f9-a9487224190d	t	\N	2025-07-30 08:38:29.901786
b018e6b6-65d5-4592-88ff-111c2ab4443e	prachiDhakad	$2b$10$yt23eJCMj4E/5G87xqpvfu1tD1oVdQg1GtHcOUj8keAC.5i2NTP.y	student	20126993-4b0d-416b-ad9d-c8297602495a	t	\N	2025-07-30 08:38:30.457278
bdcb01de-8584-4f5d-b284-64eedd68b493	Chauhan_Pragati	$2b$10$tQUrd10KMB1xxJEkiMQ1auJVNWVLgc35se7GNCCAK0iFHehFMSHpi	student	a654af61-5fb9-488e-9b80-02af4d2ed99d	t	\N	2025-07-30 08:38:31.014388
38b5bc29-d2c5-48b1-9d2c-65e330a45bca	Pranjal428	$2b$10$t3d0GSCwMe3d8fn9/eqiMeqx0LfFzkoaNgLKP2IFx7holQUq2xDz2	student	d08d4384-3e25-4720-8ea5-3480c70e2e69	t	\N	2025-07-30 08:38:31.599035
e96e0d3d-eb2c-4c27-baca-6fb6a4a863e6	prem2450	$2b$10$/XWmKNus72UHFQ7UPJT0gulD45rdoCXYl6LosUqocL1fJ95p12wu.	student	4daaac39-4f0e-4f1a-a91e-e88c8ee566cb	t	\N	2025-07-30 08:38:32.156256
6538b8e7-c76c-41d0-8f31-00c30f18b834	PCodex9	$2b$10$dFJ6QAdJEVg31wr5bL2pkelwMBag.V6P5pBu8hdWMFlFEjos4Ve3i	student	0e08463b-6820-49a4-9d5d-f51155e8126a	t	\N	2025-07-30 08:38:32.722722
2fbf0094-cd25-4bee-a230-7b8f326373e5	preranarajnag	$2b$10$nt62j5TEJsazS7q3AUPbV.elAWkVTBUEw5oQ37T5qPUDU/6q3QVRe	student	87a78f59-ec4f-4b05-8aae-d92406db0021	t	\N	2025-07-30 08:38:33.2841
a9d7f72d-5d59-4c10-be4f-fd5c83ca78ff	Priya_saini2004	$2b$10$cBpEcgcCWlJyh9gIUhbVJ.eLGSnMZvt0l/BV3w25mBDvD.rE/MXkG	student	cb9ef1ab-3ce1-4fe5-98be-345037cffe6c	t	\N	2025-07-30 08:38:33.868962
44bfdd99-babe-4d12-8cc8-d3893a9619c8	iPriyadarshi	$2b$10$C5QFSKCjR820cUyV.IutZuZ6fmMro..0xsUxZFNSfalo0DI64EUDy	student	6705ebf8-fe1a-4196-a98d-95d6471e6d03	t	\N	2025-07-30 08:38:34.458009
1bbdf784-0155-44c1-a376-f411cc118b66	Pushpraj_DSA	$2b$10$p.kYofopugX9o1GCpO3cy.AE0oAGiocpziAf7ZRrxNlxF2i4AcS5K	student	ef867ef9-7255-4d78-a85a-1e78ff45433a	t	\N	2025-07-30 08:38:35.052079
1a81c4f9-2982-4bf2-ad77-5023ee000f42	rahu48	$2b$10$3HRXoH1YS27kIznx8UjEyunrI8UM/7yuWrcYCWKn9CJQuoJLxw95.	student	05dcabff-6f0d-44e5-ae0c-bc4c04c25393	t	\N	2025-07-30 08:38:35.619768
6ae43f58-5a96-4650-a191-505e1169a267	RahulVermaji	$2b$10$KPBl4Ofvl0YL5G0ZmCQXs.2ZSprnOfv8kwCSZnn4WC7Gf9.Inb7Cq	student	8b048c59-8456-46a6-8456-2025af836d1a	t	\N	2025-07-30 08:38:36.176859
f95b3c97-0440-4935-b41e-30c68106d5a7	kn1gh7t	$2b$10$/WM1Zw7TQBCl/B2DLtQUJeGQjNZOZnoidpVgg3anmG05OIDP29Ena	student	e1a1cd3a-cea3-49a6-ad3a-85ead7ed4e5d	t	\N	2025-07-30 08:38:36.729407
2ce73e8e-df1a-43f4-816f-a08c70e58d8b	rajiv1478	$2b$10$IBrni4D9T1RspztaQrp1Qe9r4OZlooo2kuOv6FzEZNRRPGvmUSrUS	student	622f043b-16f0-473d-a310-a1ad5ff077fd	t	\N	2025-07-30 08:38:37.286566
36d8e6b5-68e0-4784-b071-1255db99c380	Rakshita_K_Biradar	$2b$10$rpAaUtfkE6zlkkgsNZXXHe16/wGOuMk0czsJiUbruDiVdwMkz0XFC	student	239487bb-7b7c-458a-8064-29412f0627db	t	\N	2025-07-30 08:38:37.840738
0d67f72e-88e5-4320-8fe3-22e2fc4175d5	Ramrajnagar	$2b$10$qbG5AonYj1bipej7QcbzrOi4Y3M2asymR3U4QQ2O/hHzMz1xrZn3e	student	23334269-d111-46d9-a795-8005907f8ea7	t	\N	2025-07-30 08:38:38.425132
60daa667-a0ab-444d-9cc1-e60a5d0b95b0	123_Rani	$2b$10$UM7XmdklwOO4Fb4hsrQfPe3hro51LpWH4TxjjQG1VN7Vaq736wwm6	student	532105ae-a70a-4037-85a6-ec87861b40f3	t	\N	2025-07-30 08:38:38.992265
111c2ed7-8e07-4b4a-bc83-0f5206a5bcd4	Ranjeet_kumar	$2b$10$t8dsSr9IgX2OvCmcbDt2UuOEm3M6SseB.OFfoinl4ucpVO7mPYY82	student	69c9a9e2-7af3-40f9-bd03-289af1b1b8b4	t	\N	2025-07-30 08:38:39.579193
e3830775-9585-44ee-a4f6-dd4e80596c28	MouryaRavi	$2b$10$Z/Pou3u0rgudPcuPP/bK..WZdmHLXBmAMMplGna.24srAqSOtiAce	student	f7fe0d4c-e827-458e-b029-eb3705c01ba6	t	\N	2025-07-30 08:38:40.162728
6df7f42f-fbf4-4180-a08b-3417a3c59244	RAVI-RAJPUT-UMATH	$2b$10$mQI7TJq2A4TaGgHo3yQTAO5S/dDZ5WvSKOqFpdJgJToZzop8SoGSG	student	383480b0-52ce-4ea6-ab74-ac8fcbeb43bc	t	\N	2025-07-30 08:38:40.760106
df067ba0-745f-46f3-8a75-00d97e2b79d6	RITESH12JHA24	$2b$10$DKyYJ97Muqzdwq3q7wvvx.KF4ciK0BnrWTHQEDx5rcukY0j0fNdQW	student	325b2116-87c3-445d-ae3e-40e172488390	t	\N	2025-07-30 08:38:41.327134
2ec50461-af85-4d08-93cb-21dfabadd9e4	Ishant_57	$2b$10$grlIbyPKpxzwTynRZzentua3cODPeBoWKCfOvD./9uOJq.OYX1HFq	student	053febaa-804e-43bc-a606-f0b32bb2519c	t	2025-07-30 08:44:29.445	2025-07-30 08:38:11.897044
29566790-eebd-47b7-9999-3d57a86153fb	admin	$2b$10$DR1nDiHfUbHvQ/ThXGClHOLP1Sj2VsgJlg4GLqqL8nYGfBblnDYkS	admin	\N	t	2025-07-30 08:50:26.355	2025-07-30 08:37:26.660262
\.


--
-- Data for Name: weekly_trends; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.weekly_trends (id, student_id, week_start, week_end, total_problems, weekly_increment, ranking, created_at) FROM stdin;
344a54cf-5b00-4d96-a4b0-00c2d6eef4d3	e47fa29e-70aa-4119-a537-916f4ddaac9c	2025-07-27	2025-08-02	45	45	0	2025-07-30 08:38:47.366983
a9ff586a-9100-4a51-80b5-83f3fa56524e	44fcc231-c561-4033-9a69-bd76463c2be6	2025-07-27	2025-08-02	17	17	0	2025-07-30 08:38:47.886058
6576163e-21ff-40c9-af33-4c86f6b1315c	5a5bde23-a062-4155-9807-c12817b2eb2a	2025-07-27	2025-08-02	32	32	0	2025-07-30 08:38:48.179624
9c64528d-02d7-4f14-a5b1-19c55f311603	02b5fab4-88ea-4a9c-a7b2-1bfaa14e7bbc	2025-07-27	2025-08-02	79	79	0	2025-07-30 08:38:48.299269
390d8ef6-079f-4fc8-a956-69f9b622d3a4	35ff41ae-29dd-46d5-ae85-169fddc74a6b	2025-07-27	2025-08-02	2	2	0	2025-07-30 08:38:48.329459
1fa6a111-5344-48e3-8521-e3a94f3c045c	27aa02ae-619c-42c8-92f9-a9487224190d	2025-07-27	2025-08-02	72	72	0	2025-07-30 08:38:48.407599
9a52c2b3-b4aa-4852-b5c9-8e9c98836a2c	b9404122-e3ba-4556-b047-1a818de8563f	2025-07-27	2025-08-02	88	88	0	2025-07-30 08:38:48.424882
4dab83c9-b51c-495c-9487-7af3404082ff	26847339-13af-44dc-af64-66d28f3dd0be	2025-07-27	2025-08-02	72	72	0	2025-07-30 08:38:48.431672
9baa0a64-074f-4559-bf88-b86a1146782f	4ad99624-56e8-45ca-bee2-4404f36418cf	2025-07-27	2025-08-02	39	39	0	2025-07-30 08:38:48.438587
7ef05373-b60a-4909-a323-7e800a00dff0	bbbaba44-2eeb-40f7-8a30-532fc65f500c	2025-07-27	2025-08-02	3	3	0	2025-07-30 08:38:48.441831
9bf2fae9-980b-40f6-a1ba-77ddf122d19e	f3f7bb88-76dc-4475-a6f4-c84f3824e83b	2025-07-27	2025-08-02	33	33	0	2025-07-30 08:38:48.445078
b1b5b288-f446-44fd-b53f-d37b4bb1f20b	0885f3b5-4d34-41b1-b4c1-ed1aefe689c8	2025-07-27	2025-08-02	77	77	0	2025-07-30 08:38:48.453147
11f940e9-0f16-44f2-950a-d0aa81acf2cf	175b0a77-c19b-400e-89b8-f143fb4e541f	2025-07-27	2025-08-02	48	48	0	2025-07-30 08:38:48.453451
060ee568-089b-459f-8658-475d44a6fe5f	b93cc8c7-ef3e-4edf-af25-4e02e5ac8ac6	2025-07-27	2025-08-02	28	28	0	2025-07-30 08:38:48.457301
fe947839-9de1-477f-9560-ffe4f5ae3394	20126993-4b0d-416b-ad9d-c8297602495a	2025-07-27	2025-08-02	121	121	0	2025-07-30 08:38:48.458356
0667ec1a-89cf-49ec-8fe7-475eba55d08f	ef70c523-bc49-4476-a822-b9a4e02faf1b	2025-07-27	2025-08-02	89	89	0	2025-07-30 08:38:48.465134
34cd26d8-5436-4a3b-9993-749e3ceeaaf1	35d68865-4f2a-4096-a124-c503681546c8	2025-07-27	2025-08-02	3	3	0	2025-07-30 08:38:48.471889
4c50e4fa-f0e3-4d12-8753-340db7ddba49	05dcabff-6f0d-44e5-ae0c-bc4c04c25393	2025-07-27	2025-08-02	37	37	0	2025-07-30 08:38:48.478141
f99d799e-0e17-4cf2-8735-85cdd6cd89c4	454ac5c3-2602-4d87-9b9f-3cd31002d4f8	2025-07-27	2025-08-02	16	16	0	2025-07-30 08:38:48.485671
edd40911-738c-489e-bbc7-67177d586953	ef61c9a4-b055-4a18-a903-0d4ab61e57ba	2025-07-27	2025-08-02	36	36	0	2025-07-30 08:38:48.490838
726fb63e-5af9-45db-8cc5-9e485fa45241	470f521a-bb65-4bf9-bf79-3458953ce692	2025-07-27	2025-08-02	49	49	0	2025-07-30 08:38:48.503445
4ce51c6a-dbe9-4fa9-bff8-e236742e66d1	eddc341e-e2a4-45f7-b880-19e75f2d3948	2025-07-27	2025-08-02	110	110	0	2025-07-30 08:38:48.529257
1113c64a-6300-4d8b-b08e-3907e4f3104e	d67f73d1-5205-46fa-b0e3-a9ec97612e93	2025-07-27	2025-08-02	30	30	0	2025-07-30 08:38:48.531215
58ef6f19-9986-4ffe-ba8c-1e698de14dab	d5896721-2d2e-4e6f-b914-cf50962714c3	2025-07-27	2025-08-02	56	56	0	2025-07-30 08:38:48.542914
e63d6f29-3fca-43cc-8fb9-bc2ba454f5c8	8591790e-46f8-4e51-9c8f-7b2452298de6	2025-07-27	2025-08-02	52	52	0	2025-07-30 08:38:48.556434
afd4a320-6ec6-430c-98bb-fbd403132267	23d5d960-e258-48c8-9c8d-78ff55646dfe	2025-07-27	2025-08-02	31	31	0	2025-07-30 08:38:48.567703
7d5fd3e0-b425-48c0-bcac-6f6fcc5cca26	970ca8d3-0221-48f5-a1ff-a41ddd080bb3	2025-07-27	2025-08-02	95	95	0	2025-07-30 08:38:48.572804
783b77f2-a23b-4703-975c-42a4ef81d74e	8b328b80-b670-4bb4-aef9-252091d9971d	2025-07-27	2025-08-02	51	51	0	2025-07-30 08:38:48.576305
cdff5b95-1bcf-43a9-a1e3-c46d68795bb4	b02c2c63-22d4-428e-8e6e-7d023820b98d	2025-07-27	2025-08-02	54	54	0	2025-07-30 08:38:48.63328
4357bf75-b1ef-40e5-82e1-b54a826c4acc	325b2116-87c3-445d-ae3e-40e172488390	2025-07-27	2025-08-02	24	24	0	2025-07-30 08:38:48.641594
7956b495-6da8-4088-be31-12bc2f1721f6	383480b0-52ce-4ea6-ab74-ac8fcbeb43bc	2025-07-27	2025-08-02	56	56	0	2025-07-30 08:38:48.645278
2eeab0f5-020d-4cbc-89b1-aed01838a666	83046fb6-ed99-42c0-9e1a-b2f1d6648279	2025-07-27	2025-08-02	55	55	0	2025-07-30 08:38:48.649507
5422b2b0-b98f-4998-9123-901a502bff7b	87a78f59-ec4f-4b05-8aae-d92406db0021	2025-07-27	2025-08-02	42	42	0	2025-07-30 08:38:48.652677
0415107f-ac41-4f16-a02f-d32492a71aaf	a931db00-3c42-4c92-83a0-62a409bd8767	2025-07-27	2025-08-02	30	30	0	2025-07-30 08:38:48.665149
538c19ec-7fa0-47a0-a230-2cb588217c8b	bc20bb78-f46b-4d85-9715-528f67624219	2025-07-27	2025-08-02	33	33	0	2025-07-30 08:38:48.675335
194d6055-a5d5-4156-8f0c-e204b0f1496a	eaa2e58d-9aae-461d-b8cd-70d3bef51f72	2025-07-27	2025-08-02	35	35	0	2025-07-30 08:38:48.700866
892b5bca-66d3-48d4-97af-defb1cbaa044	953c988b-ab8d-4bf9-ba5a-cc5aa249c8e7	2025-07-27	2025-08-02	45	45	0	2025-07-30 08:38:48.712237
5d830ded-e023-4ade-aec0-2285581ec1ea	d50c6385-1dc5-475f-a8fb-451881c9c716	2025-07-27	2025-08-02	126	126	0	2025-07-30 08:38:48.736064
cf6b39b2-05fa-4475-9b26-59fa78cd52fc	5ec77900-b11b-4f73-86ef-bbcfe78091c0	2025-07-27	2025-08-02	251	251	0	2025-07-30 08:38:48.744532
fddcb56b-5a80-419e-b0a4-76d7f4a4e05e	848c6bcb-71f3-47bd-8d0f-7100d128c7da	2025-07-27	2025-08-02	86	86	0	2025-07-30 08:38:48.748603
3a5b4ce3-5622-49d0-b14a-80c9dc58e52e	622f043b-16f0-473d-a310-a1ad5ff077fd	2025-07-27	2025-08-02	50	50	0	2025-07-30 08:38:48.767214
4f7edbed-4432-42de-b1da-1c8524c6d617	de20d8ed-2ee2-4305-8689-3b1e2097d08f	2025-07-27	2025-08-02	53	53	0	2025-07-30 08:38:48.8137
12fb04a0-d1dc-44f8-8e68-7f85801502f2	cc687455-958c-463f-b335-d5e3f526bf30	2025-07-27	2025-08-02	100	100	0	2025-07-30 08:38:48.841976
32eeb983-6bf0-4596-ac38-130a69b02095	f36ba9f6-0b62-4138-8a53-1c0b0b0f908d	2025-07-27	2025-08-02	17	17	0	2025-07-30 08:38:48.873923
e7cc1aae-167d-4eb5-b538-65d04dde2535	80fb9e6a-28bc-4b1a-b71d-c4d176e11aab	2025-07-27	2025-08-02	47	47	0	2025-07-30 08:38:48.878621
748265e1-7cf9-4df8-8985-a42731ebef06	775e4461-3ef1-4594-8607-cb51264172fe	2025-07-27	2025-08-02	44	44	0	2025-07-30 08:38:48.884804
0457d1cc-e444-4099-b841-e55f241605a7	e56134f3-a7b0-462c-a7b6-4072bf416f13	2025-07-27	2025-08-02	53	53	0	2025-07-30 08:38:48.890664
9ba6ac33-9e22-4c04-9c7c-e8978569120b	8b048c59-8456-46a6-8456-2025af836d1a	2025-07-27	2025-08-02	47	47	0	2025-07-30 08:38:48.891512
bd780aee-79c1-4ffd-ac6c-4178b31cbc6f	f6d50422-1bb9-4986-968d-0f317fad1307	2025-07-27	2025-08-02	45	45	0	2025-07-30 08:38:48.893411
37cb1afc-26c3-43f6-bef8-fde029949944	c2f6c7be-ecef-48d2-b41b-dc26e84b1923	2025-07-27	2025-08-02	39	39	0	2025-07-30 08:38:48.895536
d599045e-c450-4d5b-b607-304115a6fb1f	820f69cd-a8af-43b0-b22e-810faf872cf7	2025-07-27	2025-08-02	42	42	0	2025-07-30 08:38:48.920961
21b35819-0ff9-4112-bf8b-8bf0a9e3c471	ccd78705-bcce-4fea-aabd-af9d69a732c3	2025-07-27	2025-08-02	38	38	0	2025-07-30 08:38:48.943655
b03d09c3-926f-41b8-a627-d1aadc98c7c8	ea804269-6e81-4a19-8778-c9de2c3b7976	2025-07-27	2025-08-02	69	69	0	2025-07-30 08:38:48.974458
7ae7a6ab-6fac-42ea-b027-9414021a99bc	2db2ba6b-0867-4a6b-ad9d-8ccbe9fe4c26	2025-07-27	2025-08-02	45	45	0	2025-07-30 08:38:48.984075
7788e0fa-ca9d-4723-99df-b85e076d1082	dd80d19f-b9d1-4799-9d56-cca95b09a4c1	2025-07-27	2025-08-02	86	86	0	2025-07-30 08:38:48.999656
dc45282b-e382-4e01-bd66-8ddb9d7f7758	c63b26a1-b257-43e7-911c-4fdd34a905e4	2025-07-27	2025-08-02	58	58	0	2025-07-30 08:38:49.024969
c33de506-60cd-42ff-afa0-9b1e07ce26a4	78d1f1ea-bc42-461f-88ad-1025c3dabe36	2025-07-27	2025-08-02	89	89	0	2025-07-30 08:38:49.134751
5a100bab-8eaa-4a3d-81ad-35aa19b248d0	eadeba07-0194-41e5-ba13-14fd857df779	2025-07-27	2025-08-02	75	75	0	2025-07-30 08:38:49.263282
212d01c1-9ddb-4321-ba95-0e958f1683dd	b523e283-136b-48aa-8813-3d6ab91dea3a	2025-07-27	2025-08-02	21	21	0	2025-07-30 08:38:49.325871
3b5c203d-b777-4172-8937-dc431658eecb	a7e7d80a-1382-45c5-ac94-de91f4a6a7ae	2025-07-27	2025-08-02	58	58	0	2025-07-30 08:38:50.351872
f1af2757-556c-48ec-90ff-0584a10a145d	153d9800-632d-4ef7-a8b0-0cbbdec511ac	2025-07-27	2025-08-02	37	37	0	2025-07-30 08:38:50.358115
c7bcf938-fdfc-4b0d-9342-e264f3cb192d	fcb7dc8b-003f-4a50-b39d-9c76adc7c957	2025-07-27	2025-08-02	23	23	0	2025-07-30 08:38:49.124611
8f723e92-0ded-4a1a-89c5-82532aade747	d08d4384-3e25-4720-8ea5-3480c70e2e69	2025-07-27	2025-08-02	35	35	0	2025-07-30 08:38:49.154135
781bc49a-dfe4-49a2-bf9d-ac21a5264536	a3a47539-0c42-4449-b242-150dffa9c114	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:38:49.177809
5e021d14-8826-41e6-9590-9ac11d4865fa	cb9ef1ab-3ce1-4fe5-98be-345037cffe6c	2025-07-27	2025-08-02	108	108	0	2025-07-30 08:38:49.252035
0e7162f9-a2cf-4676-9c79-bea9012ea994	83f7619c-a0c2-4056-906d-3c464140ce49	2025-07-27	2025-08-02	31	31	0	2025-07-30 08:38:49.258316
d25d9ba4-6e20-4bbd-a4b4-2bd213537cb8	a654af61-5fb9-488e-9b80-02af4d2ed99d	2025-07-27	2025-08-02	103	103	0	2025-07-30 08:38:49.353584
2719f27a-305c-4d86-a308-5d4a35eec4ff	d5ea0b5c-28e5-4a26-9456-c689334e7b1b	2025-07-27	2025-08-02	54	54	0	2025-07-30 08:38:49.393858
18ceabb1-67e6-4f81-b305-fc55be417bbd	532105ae-a70a-4037-85a6-ec87861b40f3	2025-07-27	2025-08-02	184	184	0	2025-07-30 08:38:49.456886
d29b454d-2d72-439e-a2db-f7879c65799b	c6ae433f-a923-44f5-8836-0efd41d3372c	2025-07-27	2025-08-02	30	30	0	2025-07-30 08:38:49.467391
6c1ad460-ab43-4045-9eaf-41bcbffda7b8	64bb0d09-5d8f-4dc7-adbf-3195483e6eef	2025-07-27	2025-08-02	132	132	0	2025-07-30 08:38:50.085698
b208ddc8-9f2f-4b91-a927-451b32f18c42	ef867ef9-7255-4d78-a85a-1e78ff45433a	2025-07-27	2025-08-02	50	50	0	2025-07-30 08:38:49.12582
ee383481-475c-4325-b00b-2bec334e31ed	69c9a9e2-7af3-40f9-bd03-289af1b1b8b4	2025-07-27	2025-08-02	0	0	0	2025-07-30 08:38:49.130271
e5a21629-d39e-4bc0-8931-98286c1a48bf	314420cc-781c-4901-bf52-467558af6801	2025-07-27	2025-08-02	89	89	0	2025-07-30 08:38:49.575808
2b8b2531-ca13-43a3-beb5-d6111146855c	23334269-d111-46d9-a795-8005907f8ea7	2025-07-27	2025-08-02	86	86	0	2025-07-30 08:38:49.644241
fb847a29-cdff-4301-a2e1-b6883fa44603	4d3fc523-4dce-44a7-bf58-4d392a6abc61	2025-07-27	2025-08-02	37	37	0	2025-07-30 08:38:49.744157
841da7ef-c1b0-4509-a31f-fc1140ade436	022e7727-d91a-47bb-95fd-fe95e3d77d75	2025-07-27	2025-08-02	43	43	0	2025-07-30 08:38:49.827947
183d4014-161a-4126-8b08-635d5438dd25	a015d1c5-ac09-48bb-80f3-285f2777ff16	2025-07-27	2025-08-02	62	62	0	2025-07-30 08:38:49.948841
d2cc3c15-d9a9-4bb5-933e-de2db6dc068c	9787009a-50fc-4691-9c71-f689f0267e78	2025-07-27	2025-08-02	100	100	0	2025-07-30 08:38:50.095605
fd6368d5-e69f-479c-aed6-21b0c748fb89	bc33191e-2292-454b-82f6-34d965b5e8a0	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:38:49.131148
8b33a265-4432-42a7-9489-d349790986f3	e78cc876-136f-4257-a040-2311fb75d4e3	2025-07-27	2025-08-02	22	22	0	2025-07-30 08:38:49.627366
a121a158-ba37-49d0-8c49-0825b305a1bb	c74b701c-b6bc-48b4-b786-834fe6c3d869	2025-07-27	2025-08-02	210	210	0	2025-07-30 08:38:49.630429
da69d05e-aabe-4107-b6db-20a8052bc4ee	94b7fcd1-7763-4505-968b-62f4e19c6017	2025-07-27	2025-08-02	57	57	0	2025-07-30 08:38:49.206921
9781caeb-b921-4cc1-bfcd-e7038d9e3523	f0fd7903-2297-43a0-900d-ca15c22da343	2025-07-27	2025-08-02	6	6	0	2025-07-30 08:38:49.396686
dbf20ad1-9b3c-4d6e-ab30-b701efaf03c5	239c7649-391f-4600-aa6d-1670223123fc	2025-07-27	2025-08-02	73	73	0	2025-07-30 08:38:49.470674
703ced2f-fe56-44d2-a943-41adf7807ce2	e1a1cd3a-cea3-49a6-ad3a-85ead7ed4e5d	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:38:49.474134
33e712c1-11fd-419a-863f-f75de9c95c9d	f7fe0d4c-e827-458e-b029-eb3705c01ba6	2025-07-27	2025-08-02	31	31	0	2025-07-30 08:38:49.496122
4bc58c3f-d2f8-407d-982f-3209001896a8	226a20bc-b490-4a83-9275-2060f17f6dcb	2025-07-27	2025-08-02	43	43	0	2025-07-30 08:38:49.210079
dbe432f0-43b1-4f91-8263-6f292167fabc	ef5ea6da-4d8f-4a97-a872-573758efe738	2025-07-27	2025-08-02	34	34	0	2025-07-30 08:38:49.628515
9bee3c9d-18c3-4bb1-8f8e-86bfc9d4392e	053febaa-804e-43bc-a606-f0b32bb2519c	2025-07-27	2025-08-02	133	133	0	2025-07-30 08:38:49.73474
6802cdde-d3e4-456f-abb4-203ffd2c630e	ca3e44b8-ae5d-45ad-b3c3-8329d2eafa1e	2025-07-27	2025-08-02	41	41	0	2025-07-30 08:38:49.953928
56819943-6758-41d2-b1be-01506bca0b1a	b8535a47-eaba-4a85-acc5-819dc3ea2c79	2025-07-27	2025-08-02	84	84	0	2025-07-30 08:38:49.392477
a3e7108f-7be2-47cd-a329-34da9a46ac89	bf9260c6-b2ad-45ca-b823-08ec14a09d77	2025-07-27	2025-08-02	42	42	0	2025-07-30 08:38:49.631155
5d4908ea-8e25-43ec-bcd0-4407fb6fad30	0e08463b-6820-49a4-9d5d-f51155e8126a	2025-07-27	2025-08-02	37	37	0	2025-07-30 08:38:49.73215
c28a9e89-6792-4581-8a42-305127675029	6705ebf8-fe1a-4196-a98d-95d6471e6d03	2025-07-27	2025-08-02	133	133	0	2025-07-30 08:38:50.088575
d3b251da-e00b-43b7-9636-9e2ed20a6070	4daaac39-4f0e-4f1a-a91e-e88c8ee566cb	2025-07-27	2025-08-02	48	48	0	2025-07-30 08:38:50.454082
7e1df047-ee0e-463a-9cea-79b35b7f7674	e9f448a2-6e79-472a-b54a-3e2b7227732e	2025-07-27	2025-08-02	37	37	0	2025-07-30 08:38:50.574499
5a94ece7-8583-401f-b723-6b61358bb332	14a31dce-9b45-489c-8f63-828b9923c998	2025-07-27	2025-08-02	115	115	0	2025-07-30 08:56:17.747137
7121e5d5-19e3-4213-a9b4-cd454069f273	0d823894-0176-495c-87ce-20097a583321	2025-07-27	2025-08-02	125	125	0	2025-07-30 08:56:17.794157
b78c369d-2ae6-48f1-b4c5-e545fba64eaa	44210e81-937a-423b-a477-eda3bbdbb542	2025-07-27	2025-08-02	67	67	0	2025-07-30 08:56:17.797517
37573220-b2ec-45e1-8090-fb2b7cae2764	4446a050-c281-4919-baf3-b9ae0448a9b5	2025-07-27	2025-08-02	112	112	0	2025-07-30 08:56:17.805994
b47ab870-3ff9-49a5-be37-2f0b66ea4a48	8d955474-d4dd-41a1-b15e-5b8b4a55b2ea	2025-07-27	2025-08-02	119	119	0	2025-07-30 08:56:17.850933
fbb1b3f3-6215-4db3-90c7-d6512606a2d7	60558163-98e7-4575-94d1-258b24312072	2025-07-27	2025-08-02	52	52	0	2025-07-30 08:56:17.872571
765f501f-a408-4f66-86c0-e932a0f9ba44	eefc776d-f821-46d5-b42b-ff3124549b26	2025-07-27	2025-08-02	32	32	0	2025-07-30 08:56:17.880912
dbdf6a8a-4a5d-4d43-a686-9f4d32c982c3	25ff7510-3171-4819-8142-8f057a823f9f	2025-07-27	2025-08-02	116	116	0	2025-07-30 08:56:17.921222
50db55aa-a4e5-463f-8bf3-5386c0a6eac4	19d43931-8406-4ba9-8b68-fada97d63aae	2025-07-27	2025-08-02	32	32	0	2025-07-30 08:56:17.925071
35486351-a53e-4c2a-95e3-4b068625ae6d	10117fbb-d910-4ba3-8163-b150f6d2fc85	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:56:17.981793
4db88d69-35c5-4b24-899c-a2289bf40651	ac32c466-4a79-42e7-83c5-52488ac1eb73	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:56:18.022299
373e5b8c-8e87-4706-8534-d8799fd73ae7	fed9aaca-b863-4357-a17b-eca8afe3d7b4	2025-07-27	2025-08-02	33	33	0	2025-07-30 08:56:18.034574
b693d993-f6f5-4b7f-ad45-51aa553b3968	eede2fb3-5b57-4d19-b2ce-3d519daadcde	2025-07-27	2025-08-02	99	99	0	2025-07-30 08:56:18.038805
2d2f45e4-552d-4e7a-bc78-59b190477f6e	c4cf1f8f-446e-455a-84c6-948fee323d45	2025-07-27	2025-08-02	67	67	0	2025-07-30 08:56:18.209721
38dab6eb-8444-4444-9323-f840d1cbcbb1	7cf11203-440f-4569-bbcc-16e0c3433dc1	2025-07-27	2025-08-02	121	121	0	2025-07-30 08:56:18.218076
93f7eaad-a800-4f77-a802-b47caa279498	25da5cb1-3c7f-4853-99ab-78a19d145255	2025-07-27	2025-08-02	142	142	0	2025-07-30 08:56:18.226089
3439ae37-d56e-47f7-8b2e-3476824c5d3b	33932a5f-3799-48f8-bd10-44a045e89761	2025-07-27	2025-08-02	54	54	0	2025-07-30 08:56:18.289396
6994f4ba-d95e-478c-9149-14908ea40137	ea9e6245-2398-4659-b4a3-3f9617bc39b6	2025-07-27	2025-08-02	46	46	0	2025-07-30 08:56:18.290016
9f0153e5-c098-44db-9d3c-3780e60d4b67	04116f10-07bb-4f95-94f6-509aeeeff813	2025-07-27	2025-08-02	62	62	0	2025-07-30 08:56:18.298832
9cb6bee3-8946-4078-aa33-ed4e0322ad4f	a1888b67-a17f-403b-bb95-2035ed1399c1	2025-07-27	2025-08-02	43	43	0	2025-07-30 08:56:18.313574
a107b8f3-334e-4d54-9663-599b3e6bc547	f1f6826b-ca51-4021-a000-76f09967280c	2025-07-27	2025-08-02	17	17	0	2025-07-30 08:56:18.326901
10e0d481-d37c-4807-bc0f-9118560c5b25	74682f71-5d10-473d-884d-78af141f0e77	2025-07-27	2025-08-02	57	57	0	2025-07-30 08:56:18.354656
dcf25076-5742-4cdd-b725-2691800278df	4eb5aca4-eb8f-48f6-a342-07e9b227d252	2025-07-27	2025-08-02	52	52	0	2025-07-30 08:56:18.358194
fe216329-d3c3-42d2-bc56-672633342c1a	77730508-65ec-4f52-90f3-dee14849807f	2025-07-27	2025-08-02	4	4	0	2025-07-30 08:56:18.359347
e11f3533-0aeb-4a0c-8d47-c7d730102d51	f885d44f-831d-40b6-b0f6-6dd1db997b96	2025-07-27	2025-08-02	39	39	0	2025-07-30 08:56:18.452808
cf4cbc98-5fd2-47b3-96bf-d1b4b4be3618	19920cf9-aa64-4b86-91be-2c7001af4617	2025-07-27	2025-08-02	50	50	0	2025-07-30 08:56:18.517755
0470ad32-17b9-43e1-9431-d22dfc37f92f	b5ff51f7-41ef-4095-bd3e-a5f7764e1622	2025-07-27	2025-08-02	57	57	0	2025-07-30 08:56:18.595925
60287fe5-4735-4b22-a9e3-57018b597dd8	2a4b7a15-8d01-4046-a203-018a12aa6fd3	2025-07-27	2025-08-02	77	77	0	2025-07-30 08:56:18.634094
344b203c-ae3d-43ee-aa72-d2edf8d68882	fa0c1651-a329-44d6-a09e-b58a05c294b7	2025-07-27	2025-08-02	15	15	0	2025-07-30 08:56:18.69032
ec5f5c43-aa13-4186-bc21-1fa847a12523	6ff56caa-ded0-4ff4-9fd6-e297bf38df3b	2025-07-27	2025-08-02	193	193	0	2025-07-30 08:56:18.712094
69401101-e608-4c98-bb3e-0c4214735779	ef8e2de7-164c-43ef-a966-ac6f26a60f6b	2025-07-27	2025-08-02	7	7	0	2025-07-30 08:56:18.802108
cde6164a-47e6-40cc-bbf3-417fdbc5b4da	580bce8c-5cd2-4986-96ec-3dd320e7a6b9	2025-07-27	2025-08-02	96	96	0	2025-07-30 08:56:18.842213
52782458-0b40-44b4-8251-2668b54b2493	2740e2f0-01fe-4175-92d3-d4f828905671	2025-07-27	2025-08-02	29	29	0	2025-07-30 08:56:18.88413
6e2e2221-192f-4a4f-8900-b05e615108f2	4840b9aa-aaed-4b15-8f7d-d1bf586289b9	2025-07-27	2025-08-02	55	55	0	2025-07-30 08:56:19.194129
a693777c-40d4-4c3d-a2a9-67cc8528aaa6	44f5a7ad-9ad9-4b92-abf7-281d6a82fa61	2025-07-27	2025-08-02	11	11	0	2025-07-30 08:56:19.61451
2125cad2-11ed-45bc-b0fa-ca3b8c9b6cd0	b3d7a07a-e398-403c-a06e-6fef9a1098d9	2025-07-27	2025-08-02	25	25	0	2025-07-30 08:56:19.738502
c9b7de3f-5576-4c74-8d9e-fbaae52b699c	a6b28c11-a2f3-45dd-b629-0b802b75acb4	2025-07-27	2025-08-02	44	44	0	2025-07-30 08:58:07.401609
1c168252-d693-4338-abfd-631dd021229d	7c5d12f0-dd76-4c75-abff-8c6c07e7bde2	2025-07-27	2025-08-02	152	152	0	2025-07-30 08:58:07.408224
e4f6b08c-7fe1-47e6-a455-43714b2409e1	b230f1fc-6f85-40a6-bb08-3626cf97d982	2025-07-27	2025-08-02	70	70	0	2025-07-30 08:58:07.989026
bab652b4-dfa6-4fc2-93b2-5a69f2567cb7	3015cacc-2887-41c4-9ebb-581d9a212692	2025-07-27	2025-08-02	31	31	0	2025-07-30 08:58:08.012255
c38d6f36-3c18-40d8-8bcd-7e4afa2a0f1e	0d02061b-b2e3-4b07-9e45-f51a3f017a84	2025-07-27	2025-08-02	44	44	0	2025-07-30 08:58:08.637658
76dc2e81-2d59-410d-ab31-15b6dfebd37a	6bdc8bfe-527f-472b-82e3-92bee65b0e5a	2025-07-27	2025-08-02	111	111	0	2025-07-30 08:58:08.79818
f6965124-b5ec-4f06-889d-419e66562e8e	435fa24d-fbe6-4e18-9086-af6fe2e71548	2025-07-27	2025-08-02	203	203	0	2025-07-30 08:58:09.031889
97a857ad-c3c8-4bab-a05f-b9b345fd9ec8	f2f72e23-354f-4f57-8aa8-39d644c6b5df	2025-07-27	2025-08-02	24	24	0	2025-07-30 08:58:09.084188
f3c65077-ebfa-427c-9009-22979ade3623	0ca5a38c-a24e-4748-937e-8c2a06585b35	2025-07-27	2025-08-02	50	50	0	2025-07-30 08:58:09.116687
\.


--
-- Name: app_settings app_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.app_settings
    ADD CONSTRAINT app_settings_pkey PRIMARY KEY (id);


--
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id);


--
-- Name: daily_progress daily_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.daily_progress
    ADD CONSTRAINT daily_progress_pkey PRIMARY KEY (id);


--
-- Name: public_dashboards public_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.public_dashboards
    ADD CONSTRAINT public_dashboards_pkey PRIMARY KEY (id);


--
-- Name: public_dashboards public_dashboards_public_url_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.public_dashboards
    ADD CONSTRAINT public_dashboards_public_url_unique UNIQUE (public_url);


--
-- Name: student_submissions student_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_submissions
    ADD CONSTRAINT student_submissions_pkey PRIMARY KEY (id);


--
-- Name: student_topic_mastery student_topic_mastery_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_topic_mastery
    ADD CONSTRAINT student_topic_mastery_pkey PRIMARY KEY (id);


--
-- Name: students students_leetcode_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_leetcode_username_unique UNIQUE (leetcode_username);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: topic_tags topic_tags_name_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.topic_tags
    ADD CONSTRAINT topic_tags_name_unique UNIQUE (name);


--
-- Name: topic_tags topic_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.topic_tags
    ADD CONSTRAINT topic_tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: weekly_trends weekly_trends_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.weekly_trends
    ADD CONSTRAINT weekly_trends_pkey PRIMARY KEY (id);


--
-- Name: badges badges_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: daily_progress daily_progress_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.daily_progress
    ADD CONSTRAINT daily_progress_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: public_dashboards public_dashboards_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.public_dashboards
    ADD CONSTRAINT public_dashboards_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: student_submissions student_submissions_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_submissions
    ADD CONSTRAINT student_submissions_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: student_submissions student_submissions_verified_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_submissions
    ADD CONSTRAINT student_submissions_verified_by_users_id_fk FOREIGN KEY (verified_by) REFERENCES public.users(id);


--
-- Name: student_topic_mastery student_topic_mastery_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_topic_mastery
    ADD CONSTRAINT student_topic_mastery_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: student_topic_mastery student_topic_mastery_topic_tag_id_topic_tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student_topic_mastery
    ADD CONSTRAINT student_topic_mastery_topic_tag_id_topic_tags_id_fk FOREIGN KEY (topic_tag_id) REFERENCES public.topic_tags(id);


--
-- Name: users users_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: weekly_trends weekly_trends_student_id_students_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.weekly_trends
    ADD CONSTRAINT weekly_trends_student_id_students_id_fk FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

