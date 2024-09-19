create database library;

show databases;

use library;

show tables;

CREATE TABLE book (
    code_book varchar(8) UNIQUE,
    title varchar(255),
    author varchar(25),
    stock int,
    primary KEY(code_book)
);

CREATE TABLE member (
    code_member varchar(8) UNIQUE,
    name varchar(255),
    is_penalty boolean default false,
    penalty_end_date date null,
    primary KEY(code_member)
);

CREATE TABLE borrowing (
    code_borrow int AUTO_iNCREMENT primary KEY,
    code_member varchar(8),
    code_book varchar(8),
    borrow_date date,
    return_date date,
    is_returned boolean,
    CONSTRAINT FK_member FOREIGN KEY (code_member) references member(code_member),
    CONSTRAINT FK_book FOREIGN KEY (code_book) references book(code_book)
);


insert into book
values 
("JK-45", "Harry Potter", "J.K Rowling", 1),
("SHR-1","A Study in Scarlet","Arthur Conan Doyle",1),
("TW-11","Twilight","Stephenie Meyer",1),
("HOB-83","The Hobbit, or There and Back Again", "J.R.R. Tolkien",1),
("NRN-7","The Lion, the Witch and the Wardrobe","C.S. Lewis",1 )

select * from book

insert into member
values 
("M001","Angga", false, null),
("M002","Ferry", false, null),
("M003","Putri", false, null)

select * from member;
