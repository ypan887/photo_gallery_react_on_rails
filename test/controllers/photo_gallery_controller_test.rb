require 'test_helper'

class PhotoGalleryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get photo_gallery_index_url
    assert_response :success
  end

end
