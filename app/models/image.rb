class Image < ApplicationRecord
  mount_uploader :image, ImageUploader
  attr_accessor :crop_x, :crop_y, :crop_width, :crop_height

  def self.default_images(image_number)
    images = (1..image_number).to_a
    images.map{|img| { "title": "Heaven of time",
                                           "desc": "Here he comes Here comes Speed Racer.",
                                           "url": "/assets/#{img}.jpg"
                                     } }
  end

  def self.format_images(images)
    JSON.parse(images.to_json).map{|img| img.merge!(img["image"]["thumb"]); img.delete("image");img}
  end

  def set_crop_data(data)
    self.crop_x = data['x']
    self.crop_y = data['y']
    self.crop_width = data['width']
    self.crop_height = data['height']
  end
end
