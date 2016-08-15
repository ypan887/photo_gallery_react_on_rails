class ImagesController < ApplicationController
  def index
    random_images = Image.format_images(Image.limit(15).order("RANDOM()"))
    images_size = random_images.size

    if images_size <16
      @images_props = Image.default_images(16 - images_size).concat random_images
    else
      @images_props = random_images.concat Image.format_images(Image.last)
    end
  end

  def create
    image = Image.new(image_param)
    image.save!
    redirect_to root_path
  end

private

  def image_param
    params.require(:image).permit(:title, :desc, :image)
  end
end
