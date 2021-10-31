class AddOnlineToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :online, :boolean, default: true, null: false
  end
end
