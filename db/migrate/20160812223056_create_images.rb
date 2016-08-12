class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :fileName
      t.string :title
      t.string :desc
      t.json :images
    end
  end
end
