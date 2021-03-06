class Image < ApplicationRecord
  mount_uploader :image, ImageUploader
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h
  after_save :crop_image

  def self.default_images(image_number)
    images = (1..image_number).to_a
    images.map{|img| { "title": "Heaven of time",
                       "desc": "Here he comes Here comes Speed Racer.",
                       "url": ActionController::Base.helpers.asset_path("#{img}.jpg") } }
  end

  def self.format_images(images)
    JSON.parse(images.to_json).map{|img| img.merge!(img["image"]["thumb"]); img.delete("image");img}
  end

  def set_crop_data(data)
    self.crop_x = data['x']
    self.crop_y = data['y']
    self.crop_w = data['width']
    self.crop_h = data['height']
  end

  def crop_image
    image.recreate_versions! if crop_x.present?
  end
end
