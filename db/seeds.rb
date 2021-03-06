# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = User.create([
	{first_name: 'Jacquetta', last_name: 'Pellegrini', email: 'jpellegrini@email.com', password: 'password1', password_confirmation: 'password1'
	},
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


users.each do |user|
	user.photo.attach(
    io: File.open(Rails.public_path.join("packs/media/images/#{user.first_name.downcase}.jpg").to_s),
    filename: "#{user.first_name.downcase}.jpg"
	)
end


requests = Request.create([
	{owner_id: 1, title: "Heavy furniture help", request_type: "one-time task", description: "I need help carrying a piece of heavy furniture.", address: "3190 Bicetown Road New York, New York City, NY 10007", latitude: 40.713051, longitude: -74.007233, helper_quantity: 3
	},
	{owner_id: 2, title: "Lawn mower broken", request_type: "one-time task", description: "I need help repairing my lawn mower.", address: "60 Huck Rd, Bloomfield, NJ 07003", latitude: 40.824871, longitude: -74.184639, helper_quantity: 3
	},
	{owner_id: 3, title: "Dog walker needed", request_type: "one-time task", description: "I need someone to walk my dog.", address: "1934 Raritan Rd, Scotch Plains, NJ 07076", latitude: 40.622570, longitude: -74.351227, helper_quantity: 3
	},
	{owner_id: 4, title: "No more toiler paper", request_type: "material need", description: "I need some toiler paper. Because of covid 19 I ran out and no store have some in stock.", address: "107-34 121st St, Queens, NY 11419", latitude: 40.688549, longitude: -73.822937, helper_quantity: 3
	}
	])

	fulfillments = Fulfillment.create([ 
		{request_id: 1, volunteer_id: 5},
		{request_id: 2, volunteer_id: 6},
                {request_id: 3, volunteer_id: 7},
                 {request_id: 4, volunteer_id: 8}
		])
	
messages = Message.create([
         {creator_id: 5, request_id: 1, body: "Hi, I can help you "},
         {creator_id: 1, request_id: 1, body: "Great! Once we get one more person, I will schedule a date."},
        {creator_id: 6, request_id: 2, body: "Hi, I know how to repair a lawn mower. I can drop by after work."},
        {creator_id: 2, request_id: 2, body: "Awesome! I'm available after 5pm"},
       {creator_id: 7, request_id: 3, body: "Hi, I love dogs and I would like to walk your dog."},
     {creator_id: 3, request_id: 3, body: "Hello, can you come on Sunday?"},
   {creator_id: 8, request_id: 4, body: "I have a roll of toiler paper and I can drop it off for you"},
  {creator_id: 4, request_id: 4, body: "Thank you! I need some some more to last the week."}      
]) 	

	
	