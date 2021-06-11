# 指定文件、指定行、指定代码块不使用 ESLint 语法检查

## 整个文件范围内禁止规则出现警告

- 将`/* eslint-disable */`放置于文件最顶部

```js
/* eslint-disable */
console.log(111)
```

## 在文件中临时禁止规则出现警告

- 将需要忽略的代码块用注释包裹起来

```js
/* eslint-disable */
console.log(111)
/* eslint-enable */
```

## 对指定规则的启用或者禁用警告

- 将需要忽略的代码块用注释包裹起来

```js
/* eslint-disable no-alert, no-console */
console.log(111)
/* eslint-enable no-alert, no-console */
```

## 对指定行禁用规则警告

```js
console.log(111) // eslint-disable-line

// eslint-disable-next-line
console.log(111)
```

## 在指定行上禁用指定的某个规则

```js
console.log(111) // eslint-disable-line no-console

// eslint-disable-next-line no-console
console.log(111)
```

## 在某个特定的行上禁用多个规则

```js
console.log(111) // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
console.log(111)
```
