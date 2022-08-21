# Mongoose-QueryBuilder

[https://www.npmjs.com/package/mongoose-querybuilder](https://www.npmjs.com/package/mongoose-querybuilder)

Supports stricter types for mongoose query specifically nested fields.

## installation

```
$ npm i mongoose-querybuilder
```

## Usage

### Filter Query

```
import { QueryBuilder } from 'mongoose-querybuilder'

interface Schema {
  key1: string
  key2: string[]
  key3: {
    key4: number
    key5: string[]
  }
  key6: {
    key7: number
  }[]
  key8: number
}

const query = QueryBuilder<Schema>()
  .eq('key1','key1')
  .all('key3.key5',['s1','s2'])
  .gt('key8',10)
  .elemMatch('key6',{ key7: 1 })
  .build()

console.log(query)
// {
//   key1: 'key1',
//   'key3.key5': { $all: ['s1','s2'] },
//   key8: { $gt: 10 },
//   key6: { $elemMatch: { key7: 1 } }
// }
```

- `eq(key,value)`  
  as same as `{ [key]: value }`

- `not(key,value)`  
  as same as `{ [key]: { $not: value } }`

- `gt(key,value)`  
  as same as `{ [key]: { $gt: value } }`

- `gte(key,value)`  
  as same as `{ [key]: { $gte: value } }`

- `lt(key,value)`  
  as same as `{ [key]: { $lt: value } }`

- `lte(key,value)`  
  as same as `{ [key]: { $lte: value } }`

- `exists(key,value)`  
  as same as `{ [key]: { $exists: value } }`

- `exists(key,value)`  
  as same as `{ [key]: { $exists: value } }`

- `regex(key,value)`  
  as same as `{ [key]: { $regex: value } }`

- `in(key,value)`  
  as same as `{ [key]: { $in: value } }`

- `ne(key,value)`  
  as same as `{ [key]: { $ne: value } }`

- `nin(key,value)`  
  as same as `{ [key]: { $nin: value } }`

- `all(key,value)`  
  as same as `{ [key]: { $all: value } }`

- `size(key,value)`  
  as same as `{ [key]: { $size: value } }`

- `elemMatch(key,value)`  
  as same as `{ [key]: { $elemMatch: value } }`

- `or(key,value)`  
  as same as `{ $or: [ ...value ] }`

- `and(key,value)`  
  as same as `{ $and: [ ...value ] }`

- `nor(key,value)`  
  as same as `{ $nor: [ ...value ] }`

### Update Query

```
import { UpdateQueryBuilder } from 'mongoose-querybuilder'

interface Schema {
  key1: string
  key2: string[]
  key3: {
    key4: number
    key5: string[]
  }
  key6: {
    key7: number
  }[]
  key8: number
}

const query = UpdateQueryBuilder<Schema>()
  .set('key1','string')
  .set('key8',10)
  .unset('key2')
  .pull('key6',{ key7: 1 })
  .push('key3.key5',{
    $each: ['1'],
    $slice: -5,
    $position: 3
  })
  .build()

console.log(query)
// {
//   $set: {
//     key1: 'string',
//     key8: 10
//   },
//   $unset: {
//     key2: 1
//   },
//   $pull: {
//     key6: {
//       key7: 1
//     }
//   },
//   $push: {
//     'key3.key5': {
//       $each: ['1'],
//       $slice: -5,
//       $position: 3
//     }
//   }
// }
```

- `set(key,value)`  
  as same as `{ $set: { [key]: value } }`

- `unset(key)`  
  as same as `{ $unset: { [key]: 1 } }`

- `push(key,value)`  
  as same as `{ $push: { [key]: value } }`

- `pop(key,value)`  
  as same as `{ $pop: { [key]: value } }`

- `pull(key,value)`  
  as same as `{ $pull: { [key]: value } }`

- `inc(key,value)`  
  as same as `{ $inc: { [key]: value } }`
