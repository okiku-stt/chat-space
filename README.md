# README

# DB設計

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association(group)
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|

### Association(user)
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association(groups_users)
- belongs_to :group
- belongs_to :user

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association(message)
- belongs_to :group
- belongs_to :user