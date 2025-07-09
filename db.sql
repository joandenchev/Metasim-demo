--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-09 07:51:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 536646)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: metasim
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO metasim;

--
-- TOC entry 6 (class 2615 OID 536647)
-- Name: records; Type: SCHEMA; Schema: -; Owner: metasim
--

CREATE SCHEMA records;


ALTER SCHEMA records OWNER TO metasim;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 536665)
-- Name: sessions; Type: TABLE; Schema: auth; Owner: metasim
--

CREATE TABLE auth.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE auth.sessions OWNER TO metasim;

--
-- TOC entry 222 (class 1259 OID 536664)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: auth; Owner: metasim
--

CREATE SEQUENCE auth.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.sessions_id_seq OWNER TO metasim;

--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 222
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: metasim
--

ALTER SEQUENCE auth.sessions_id_seq OWNED BY auth.sessions.id;


--
-- TOC entry 221 (class 1259 OID 536656)
-- Name: users; Type: TABLE; Schema: auth; Owner: metasim
--

CREATE TABLE auth.users (
    id integer NOT NULL,
    email character varying(60) NOT NULL,
    password character(60) NOT NULL
);


ALTER TABLE auth.users OWNER TO metasim;

--
-- TOC entry 220 (class 1259 OID 536655)
-- Name: users_id_seq; Type: SEQUENCE; Schema: auth; Owner: metasim
--

CREATE SEQUENCE auth.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.users_id_seq OWNER TO metasim;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: metasim
--

ALTER SEQUENCE auth.users_id_seq OWNED BY auth.users.id;


--
-- TOC entry 219 (class 1259 OID 536649)
-- Name: courses; Type: TABLE; Schema: records; Owner: metasim
--

CREATE TABLE records.courses (
    id integer NOT NULL,
    title character varying(25),
    image character varying(30),
    description text
);


ALTER TABLE records.courses OWNER TO metasim;

--
-- TOC entry 218 (class 1259 OID 536648)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: records; Owner: metasim
--

CREATE SEQUENCE records.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE records.courses_id_seq OWNER TO metasim;

--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 218
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: records; Owner: metasim
--

ALTER SEQUENCE records.courses_id_seq OWNED BY records.courses.id;


--
-- TOC entry 4708 (class 2604 OID 536668)
-- Name: sessions id; Type: DEFAULT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.sessions ALTER COLUMN id SET DEFAULT nextval('auth.sessions_id_seq'::regclass);


--
-- TOC entry 4707 (class 2604 OID 536659)
-- Name: users id; Type: DEFAULT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.users ALTER COLUMN id SET DEFAULT nextval('auth.users_id_seq'::regclass);


--
-- TOC entry 4706 (class 2604 OID 536652)
-- Name: courses id; Type: DEFAULT; Schema: records; Owner: metasim
--

ALTER TABLE ONLY records.courses ALTER COLUMN id SET DEFAULT nextval('records.courses_id_seq'::regclass);


--
-- TOC entry 4868 (class 0 OID 536665)
-- Dependencies: 223
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: metasim
--

COPY auth.sessions (id, token, user_id) FROM stdin;
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVVc2VyIjoiam9hbmRlbmNoZXZAZ21haWwuY29tIiwiaWF0IjoxNzUyMDIzMzc2LCJleHAiOjE3NTU5MTEzNzZ9.HyCeppMybXIrsYLdx_p-BDM8_y6ZzHivaaiZ-5tP_zY	2
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVVc2VyIjoiam9hbmRlbmNoZXZAZ21haWwuY29tIiwiaWF0IjoxNzUyMDM2NTg0LCJleHAiOjE3NTU5MjQ1ODR9.xVmK72HdlBL1YUIHVH8CAz22YPIo0gxirw3t3qznerk	2
\.


--
-- TOC entry 4866 (class 0 OID 536656)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: metasim
--

COPY auth.users (id, email, password) FROM stdin;
1	admin@metasim.io	$2a$12$z8pMaLegY2KTh/o7gRRoIehQnYkR4vjXJ/VtL/OK5aBS69FPi82zS
2	joandenchev@gmail.com	$2a$12$N8u8gIo9XhibiCMZtzLjMu9ioUsQtJ7ewMy/vzWqt5P4KLLjfiC82
\.


--
-- TOC entry 4864 (class 0 OID 536649)
-- Dependencies: 219
-- Data for Name: courses; Type: TABLE DATA; Schema: records; Owner: metasim
--

COPY records.courses (id, title, image, description) FROM stdin;
28	English Foundations	english.png	Learn essential English for everyday use, including basic vocabulary, simple grammar, and common phrases. Perfect for beginners starting their language journey.
30	English Foundations	english.png	Learn essential English for everyday use, including basic vocabulary, simple grammar, and common phrases. Perfect for beginners starting their language journey.
29	Music	guitar.png	Learn to play guitar step by step with easy lessons, personalized guidance, and songs you enjoy. Build skills, rhythm, and confidence from day one.
25	Mathematics for kids	math.png	Learn math in a fun and clear way, from basic skills to advanced problem-solving. Build confidence and apply what you learn to real-life situations.
27	Communications	coms.png	Develop professional communication skills to express ideas clearly, lead conversations, and build strong connections in any business or team setting.
31	Business talk	coms.png	Develop professional communication skills to express ideas clearly, lead conversations, and build strong connections in any business or team setting.
26	Guitar Essentials	guitar.png	Learn to play guitar step by step with easy lessons, personalized guidance, and songs you enjoy. Build skills, rhythm, and confidence from day one.
32	Mathematics	math.png	Learn math in a fun and clear way, from basic skills to advanced problem-solving. Build confidence and apply what you learn to real-life situations.
35	Test	\N	How a regular element looks, without an image.
\.


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 222
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: metasim
--

SELECT pg_catalog.setval('auth.sessions_id_seq', 7, true);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: metasim
--

SELECT pg_catalog.setval('auth.users_id_seq', 2, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 218
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: records; Owner: metasim
--

SELECT pg_catalog.setval('records.courses_id_seq', 35, true);


--
-- TOC entry 4716 (class 2606 OID 536672)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 536680)
-- Name: users unique_email; Type: CONSTRAINT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT unique_email UNIQUE (email) DEFERRABLE;


--
-- TOC entry 4714 (class 2606 OID 536661)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 536654)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: records; Owner: metasim
--

ALTER TABLE ONLY records.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 536673)
-- Name: sessions fk_user_id; Type: FK CONSTRAINT; Schema: auth; Owner: metasim
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE;


-- Completed on 2025-07-09 07:51:15

--
-- PostgreSQL database dump complete
--

