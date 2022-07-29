# Modules in Node

the package.json is the principal key of our project

```
npm init 
```
cuando colocamos este codigo, lo que sucede es que podemos crear automaticamente nuestro paquete de modulos el 

`package.json`

you can see the example with this screenshot:

<img src=package.jpg width=1000 >
then that is just automatically :)

we can find more library on **internet** if we need this.

for example if we need **Express**, with this module

```
npm i express
```


## Semantic Versioning

### 1 . 3 . 1
**major.Minor.Patch**

- major is the breaking changes, the principal change, this break all of the principal module

- Minor: new funcionality-retroCompatible, this change when for example the owner of the module adds new module and the patch is restarted

- Patch: Bug fix retro-Compatible, this just change whe it is founded a bug and nothing stop being

the `package.json` hopes de versioniting with "~" (justo for Minor or Patch, or "^" for the principal or major change the major


```python
~1.2.3 is >= 1.2.3 < 1.3.0
^1.2.3 is >=1.2.3 <2.0.0
```
# The RUN in NPM

the run is just necesary for, everything except for start and test