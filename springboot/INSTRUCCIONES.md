# Instrucciones para ejecutar el backend Spring Boot

1. **Requisitos previos:**
   - Tener instalado Java 17 o superior.
   - Tener instalado Maven (https://maven.apache.org/).

2. **Estructura recomendada del proyecto:**
   - Mueve la carpeta `springboot` dentro de una estructura estándar de Maven, por ejemplo:
     ```
     springboot/
     ├── src/
     │   └── main/
     │       └── java/
     │           └── com/
     │               └── quality/
     │                   └── electrodomesticos/
     │                       ├── ArroyoApplication.java
     │                       └── controller/
     │                           └── AdminController.java
     └── pom.xml
     ```

3. **Crea un archivo `pom.xml`** en la raíz de la carpeta `springboot` con el siguiente contenido mínimo:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.quality.electrodomesticos</groupId>
    <artifactId>arroyo</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

4. **Compila y ejecuta el backend:**
   - Abre una terminal en la carpeta `springboot` y ejecuta:
     ```sh
     mvn spring-boot:run
     ```
   - El backend estará disponible en: `http://localhost:8080`

5. **Prueba los endpoints:**
   - **Login:**
     - POST `http://localhost:8080/api/admin/login?username=admin&password=admin123`
   - **Crear producto:**
     - POST `http://localhost:8080/api/admin/products?name=Producto&description=Desc&price=100.0`
   - **Eliminar producto:**
     - DELETE `http://localhost:8080/api/admin/products/{id}`
   - **Listar productos:**
     - GET `http://localhost:8080/api/admin/products`

Puedes usar herramientas como Postman o cURL para probar los endpoints.

---

¿Necesitas ayuda para conectar el frontend con este backend o alguna funcionalidad extra?
