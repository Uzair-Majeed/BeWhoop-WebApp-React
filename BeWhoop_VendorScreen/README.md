so the thing is that the users can get registered but if a user exists it takes them back to signup page. also in vendor screens when editing profile the PUT command requires all fields that is : {
 "fullName": "Jane Smith",
 "email": "jane@example.com",
 "phone": "1234567890",
 "services": ["catering", "decoration"],
 "budgetRange": "$1000-$5000",
 "city": "Los Angeles",
 "socialProof": "instagram.com/janesmith"}  but in the design there is no fields to update name and email or phone so sending them is meaningless but PUT command requires it even if ur updating a subset of the fields.
 WHat if user doesnt want to update name and email or phone,only services and budget range, but PUT command would need all fields leading to duplicate email or id error. OTHER THAN THAT POST COMMAND WORKS EFFIECIENTLY. 
