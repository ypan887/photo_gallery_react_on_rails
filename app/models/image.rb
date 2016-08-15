class Image < ApplicationRecord
  mount_uploader :image, ImageUploader

  def self.default_images(image_number)
    images = (1..image_number).to_a
    images.map{|img| { "title": "Heaven of time",
                                           "desc": "Here he comes Here comes Speed Racer.",
                                           "url": "/assets/#{img}.jpg"
                                     } }
  end

  def self.format_images(images)
    JSON.parse(images.to_json).map{|img| img["url"] = img["image"]["thumb"]}
  end
end
