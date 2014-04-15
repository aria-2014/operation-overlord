describe("My Calculate", function() {
	
	it("Addition", function() {
	
        expect(Calculate.calcAdd(4,4)).toBe(8);
		
    });
	
	it("Addition with invalid value", function(){
	
        expect(function() {Calculate.calcAdd(2,"hello")}).toThrow(new Error("Invalid Value Given"))
		
    });

	
	it("Subtraction", function() {
	
        expect(Calculate.calcSub(4,4)).toBe(0);
		
    });
	
	it("Subtraction with invalid value", function(){
	
        expect(function() {Calculate.calcSub("hello", 2)}).toThrow(new Error("Invalid Value Given"))
		
    });
	
	it("Multiplication", function() {
	
        expect(Calculate.calcMul(4,4)).toBe(16);
		
    });
	
	it("Multiplication with invalid value", function(){
	
        expect(function() {Calculate.calcSub("hello", "hello")}).toThrow(new Error("Invalid Value Given"))
		
    });

	
	it("Division", function() {
	
        expect(Calculate.calcDiv(4,4)).toBe(1);
		
    });
	
	it("Division by zero", function(){
	
        expect(function() {Calculate.calcDiv(2,0)}).toThrow(new Error("Invalid Value Given"))
		
    });
	
	
	it("Division with invalid value", function(){
	
        expect(function() {Calculate.calcSub("hello", "hello")}).toThrow(new Error("Invalid Value Given"))
		
    });
		
	
})