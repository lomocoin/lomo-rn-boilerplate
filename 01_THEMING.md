# Themes
App styles are organized in themes

## Introduction
The *base* theme in /src/themes/base is the foundations of all styles, is composed by
* **colors.ts** all the app componenents (Text, Input, Button, etc) colors's
* **variables.ts** common variables used by styles and components
* **images.ts** reference of all the images used in the app

The base theme can be extended by the **applyTheme** function.
In this example we extend the base theme with a purple theme and overwrite some colors and variables

Colors and Variables are combined in a single object called **V**

A collections of commonly use styles is avaiables in the **styles.ts**, build on top of **V** and exported as **S** it contains some basic styles that can be applyed to a View or Text (es. S.textCenter, S.textDefault, etc)


## Basic usage
* Set a <Text> align to the center and add a primary color 

```tsx
import { S } from "../themes";

render() {
  return (
    <View style={S.borderTop}>
      <Text style={[S.textDefault, S.textCenter, S.colorPrimary]}>I'am a primary text</Text>
    </View>
  );
}
```

* Set a image covering all the screen

```tsx
import { S, V, IMAGES } from "../themes";
import Image from "../Image";

render() {
  return (
    <View style={[S.flex, S.padding]}>
      <Image height={V.pgHeight} width={V.pgWidth} source={IMAGES.user_avatar_placeholder} />
    </View>
  );
}
```
