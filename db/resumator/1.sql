create table `jobs`(
  `id` bigint(20) not null auto_increment  primary key,
  `name` varchar(255) null

)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `candidates`(
  `id` bigint(20) not null auto_increment  primary key,
  `name` varchar(255) null,
  `job_id` bigint(20) default null,
  foreign key (job_id) references jobs(id) on delete cascade
)ENGINE=InnoDB auto_increment=0 default  charset=utf8;



-- down

drop table candidates;
drop table jobs;
