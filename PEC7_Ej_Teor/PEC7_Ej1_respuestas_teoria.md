# ¿Qué es y cómo funciona el elemento <`RouterLink`> en Angular?
`RouterLink` es una directiva del módulo `RouterModule` de Angular que se encarga de cambiar la URL y mostrar el componente asociado a esa ruta, sin recargar la página.
Se usa en la plantilla HTML como atributo.

# Explica la diferencia entre `routerLink` y `routerLinkActive`. ¿Qué otras directivas se pueden utilizar con el router en Angular?
`routerLink` navega a una ruta específica cuando el usuario hace clic en el elemento. Por otro lado, `routerLinkActive` aplica una o más clases CSS al elemento cuando la ruta indicada está activa.
* **`RouterLinkWithHref`:** Se activa cuando se usa `routerLink` en un enlace `<a>`.
* **`RouterOutlet`:** Marcador de posición en la plantilla donde Angular renderiza el componente correspondiente según la ruta actual.

# Describe el servicio ActivatedRouteSnapshot. ¿Cómo se utiliza y en qué casos es útil?
`ActivatedRouteSnapshot` es una clase que representa el estado inmutable de una ruta en un momento concreto.
Se usa para acceder a: parámetros de la URL, parámetros de la ruta raíz, datos estáticos definidos en la configuración de rutas, parámetros de consulta y fragmentos de la URL.
Se suele usar en `Route Guards` y en componentes.

# ¿Qué son las Route Guards? ¿Cómo se usan las guardas en Angular? Describe todas las guardas que existen en Angular (consulta para ello la documentación oficial de Angular)
Las `Route Guards` son funciones o servicios que permiten controlar la navegación entre rutas. Se utilizan para determinar si una ruta puede ser activada, desactivada, cargada o si se deben resolver datos antes de la navegación.
* **`canActive`:** Determina si una ruta puede ser activada. Se usa para restringir el acceso a rutas basadas en condiciones.
* **`canActivateChild`:** Determina si las rutas hijas de una ruta pueden ser activadas. Se usa para aplicar restricciones a rutas anidadas.
* **`canDeactivate`:** Determina si se puede salir de la ruta actual. Se usa para prevenir la pérdida de cambios no guardados en formularios.
* **`canMatch`:** Determina si una ruta coincide con la URL solicitada. Se usa para aplicar lógica personalizada para el emparejamiento de rutas.
* **`resolve`:** Obtiene datos antes de que la ruta sea activada. Se usa para cargar datos necesarios apra el componente asociado a una ruta.
* **`canLoad`:** Determina si un módulo puede ser cargado de forma diferida. Se usa para restringir la carga de módulos basados en permisos.

# ¿Qué es la carga Lazy de los módulos de Angular? ¿Cómo se configura en Angular la carga Lazy? ( https://angular.io/guide/lazy-loading-ngmodules )
La carga Lazy es una técnica que permite cargar módulos de manera diferida, es decir, solo cuando el usuario navega a la ruta correspondiente. Esto mejora el rendimiento de la aplicación.
1. Crear una aplicación.

```ng new customer-app --no-standalone```

2. Crear un módulo con rutas.

```ng generate module customers --route customers --module app.module```

3. Definir la ruta.

```
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  }
];
```

4. Configurar rutas internas.
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
```

# Compara las diferencias entre CanDeactivate y CanActivate guards en Angular. Proporciona ejemplos de cuándo se utilizaría cada uno.
`canDeactivate` evita que el usuario abandone una ruta si no se cumple cierta condición, mientras que `canActivate` evita que el usuario navegue a una ruta si no se cumple cierta condición.
`canDeactive` se usa para evitar la pérdida de datos si el usuario navega sin guardar o para mostrar un mensaje de confirmación antes de salir.
`canActive` se usa para proteger rutas a las que solo ciertos usuarios deben acceder o para comprobar si el usuario está autenticado o autorizado.

# ¿Qué es/para qué son útiles los middlewares en el contexto de Angular? ¿Dónde estás usando middlewares en nuestra aplicación?
Un middleware es la lógica intermedia que se ejecuta antes o después de una acción, como, por ejemplo: antes de que una ruta se active, antes de que se envíe una petición HTTP o después de recibir una respuesta del servidor.
En Angular existen tres mecanismso que actúan como middleware: RouteGuards, HTTP Interceptors y Resolvers.
En la aplicación no he usado middlewares, pero al hacer llamadas HTTP con `HttpClient` se pueden configurar interceptores HTTP para que actúen en este punto.