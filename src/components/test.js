// let getDouble = n => n * 2
// let obj = {}
// let count = 1
// let double = getDouble(count)

// let proxy = new Proxy(obj,{
// 	get:function(obj, prop) {
// 		console.log(obj)
// 		console.log(prop)
// 		// 参数第一个是obj对象，第二个是参数名
// 		return obj[prop]
// 	},
// 	set:function(obj, prop, value) {
// 		obj[prop] = value
// 		if (prop === 'count') {
// 			double = getDouble(value)
// 		}
// 	},
// 	deleteProperty(obj, prop) {
// 		delete obj[prop]
// 		if (prop === 'count') {
// 			double = NaN
// 		}
// 	}
// })



// Object.defineProperty(obj, 'count', {
// 	get() {
// 		return count
// 	},
// 	set(val) {
// 		count = val
// 		double = getDouble(val)
// 	}
// })

let getDouble = n => n * 2
let _value = 1
double = getDouble(_value)

let count = {
	get value() {
		return _value
	},
	set value(val) {
		_value = val
		double = getDouble(_value)
	}
}