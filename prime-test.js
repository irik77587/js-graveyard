/*
if a number is of [1,2,3,5,7]
or 
if a number is not divisible 
by [2,3,5,7, k*10+[1,3,7,9] ]
where k = 1 ... number/20
then
it is a prime number
*/
function prime_test(n){
	one_digit_prime = [2,3,5,7];
	if([1, ...one_digit_prime].includes(n))
		return true;
	if(n<10)
		return false;
	
	// Using array.map() inside if() 
	// instead of if() inside for()
	if([2,3,5,7].map(i => n%i).includes(0))
		return false;
	for(k = ~~(n/20); k>0; k--)
	{
		i=k*10;
		if(n%(i+1)&&n%(i+3)&&n%(i+7)&&n%(i+9))
			continue;
		return false;
	}
	return true;
}
