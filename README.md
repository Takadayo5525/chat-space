# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreigin_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false
|email|string|null: false, unique: true|
|pasward|string|null: false, unique:true|

### Association
-has_many :messages
-has_many :groups, through: :members
-has_many :members

##groupテーブル

|Column|Type|Option|
|------|----|------|
|group_name|string|null: fales|

###Association

-has_many :users, through: :members
-belongs_to :message
-has_many :members

##massage

|Column|Type|Option|
|------|----|------|
|body|text|null: fales|
|image|string|
|group_id|integer|
|user_id|integer|

###Association

-belongs_to :user
-belongs_to :group

