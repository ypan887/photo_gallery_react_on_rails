class ImagesController < ApplicationController
  def index
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
