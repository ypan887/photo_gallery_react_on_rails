class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string 'file_name'
      t.string 'title'
      t.string 'desc'
      t.string 'url'

      t.timestamps
    end
  end
end
