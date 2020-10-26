# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = User.create([
	{first_name: 'Jacquetta', last_name: 'Pellegrini', email: 'jpellegrini@email.com', password: 'password1', password_confirmation: 'password1'},
	{first_name: 'Alice', last_name: 'Hall', email: 'ahall@email.com', password: 'password2', password_confirmation: 'password2'},
	{first_name: 'Robert', last_name: 'Gilman', email: 'rgilman@email.com', password: 'password3', password_confirmation: 'password3'},
	{first_name: 'Tina', last_name: 'Brooks', email: 'tbrooks@email.com', password: 'password4', password_confirmation: 'password4'},
	{first_name: 'Sherry', last_name: 'Arnold', email: 'sarnold@email.com', password: 'password5', password_confirmation: 'password5'},
	{first_name: 'Patrick', last_name: 'Webb', email: 'pwebb@email.com', password: 'password6', password_confirmation: 'password6'},
	{first_name: 'Elizabeth', last_name: 'Pelaez', email: 'epelaez@email.com', password: 'password7', password_confirmation: 'password7'},
	{first_name: 'Willis', last_name: 'Decicco', email: 'wdecicco@email.com', password: 'password8', password_confirmation: 'password8'}, 
	{first_name: 'Hazel', last_name: 'Eaton', email: 'heaton@email.com', password: 'password9', password_confirmation: 'password9'},
	{first_name: 'Maria', last_name: 'Wilson', email: 'mwilson@email.com', password: 'password10', password_confirmation: 'password10'},
	{first_name: 'Manuel', last_name: 'Simmons', email: 'msimmons@email.com', password: 'password11', password_confirmation: 'password11'},
	{first_name: 'Gary', last_name: 'Snow', email: 'gsnow@email.com', password: 'password12', password_confirmation: 'password12'}
	])

requests = Request.create([
	{owner_id: 1, title: 'Heavy furniture help', request_type: 'One-time task', description: 'I need help carrying a piece of heavy furniture.', address: '3190 Bicetown Road New York, New York City, NY 10007', latitude: 40.713050, longitude: -74.007230, helper_quantity: 3
	},
	{owner_id: 2, title: 'Lawn mower broken', request_type: 'One-time task', description: 'I need help repairing my lawn mower.', address: '1836 Geneva Street New York, New York City, NY 10007', latitude: 42.880090, longitude: -76.951910, helper_quantity: 3
	},
	{owner_id: 3, title: 'Dog walker needed', request_type: 'One-time task', description: 'I need someone to walk my dog.', address: '1896 Shinn Street New York, New York City, NY 10007', latitude: 40.713050, longitude: -74.007230, helper_quantity: 3
	},
	{owner_id: 4, title: 'No more toiler paper', request_type: 'One-time task', description: 'I need some toiler paper. Because of covid 19 I ran out and no store have some in stock.', address: '2906 Farnum Road New York, New York City, NY 10007', latitude: 42.028770, longitude: -78.025600, helper_quantity: 3
	}
	])

	
	fulfillment1 = Fulfillment.new([ 
		{:request_id => 1, :volunteer_id => 5},
		{:request_id => 1, :volunteer_id => 5}
		])
	
	message1 = Message.new({:creator_id => 1, :fulfillment_id => 1, :body => "Great! Once we get one more person, I will schedule a date."}) 
	
	message5 = Message.new({:creator_id => 5, :fulfillment_id => 1, :body => "Hi, I can help you "}) 
	
	
	fulfillment1.messages << message1
	fulfillment1.messages << message5
	
	users[0].requests << requests[0]
	
	message1.fulfillment = fulfillment1
	message5.fulfillment = fulfillment1
	
	users[5].fulfillments << fulfillment1
	
	users[5].messages << message5
	users[0].messages << message1
	
	
	
	fulfillment2 = Fulfillment.new({:request_id => 2, :volunteer_id => 6})
	
	message2 = Message.new({:creator_id => 2, :fulfillment_id => 2, :body => "Awesome! I'm available after 5pm"}) 
	message6 = Message.new({:creator_id => 6, :fulfillment_id => 2, :body => "Hi, I know how to repair a lawn mower. I can drop by after work."}) 
	
	fulfillment2.messages << message2
	fulfillment2.messages << message6
	
	users[1].requests << requests[1]
	
	message2.fulfillment = fulfillment2
	message6.fulfillment = fulfillment2
	
	users[6].fulfillments << fulfillment2
	
	users[6].messages << message6
	users[1].messages << message2
	
	
	fulfillment3 = Fulfillment.new({:request_id => 3, :volunteer_id => 7})
	
	message3 = Message.new({:creator_id => 3, :fulfillment_id => 3, :body => "Hello, can you come on Sunday?"}) 
	message7 = Message.new({:creator_id => 7, :fulfillment_id => 3, :body => "Hi, I love dogs and I would like to walk your dog."}) 
	
	fulfillment3.messages << message3
	fulfillment3.messages << message7
	
	users[2].requests << requests[2]
	
	message3.fulfillment = fulfillment3
	message7.fulfillment = fulfillment3
	
	users[7].fulfillments << fulfillment3
	
	users[7].messages << message7
	users[2].messages << message3
	
	
	fulfillment4 = Fulfillment.new({:request_id => 4, :volunteer_id => 8})
	
	message4 = Message.new({:creator_id => 4, :fulfillment_id => 4, :body => "Thank you! I need some some more to last the week."}) 
	message8 = Message.new({:creator_id => 8, :fulfillment_id => 4, :body => "I have a roll of toiler paper and I can drop it off for you"}) 
	
	fulfillment4.messages << message4
	fulfillment4.messages << message8
	
	users[3].requests << requests[3]
	
	message4.fulfillment = fulfillment4
	message8.fulfillment = fulfillment4
			
	users[8].fulfillments << fulfillment4
	
	users[8].messages << message8
	users[3].messages << message4
	