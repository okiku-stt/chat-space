FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/image/1561713590893.jpg")}
    user
    group
  end
end