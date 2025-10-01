package com.devsenai1A.calculadora.controller;

    
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    
    @RestController
    public class CalculadoraController {
        
        @GetMapping("/somar")
        public double somar (@RequestParam double a, @RequestParam double b) {
            return a + b;
        }
            
        @GetMapping("/subtrair")
        public double subtrair (@RequestParam double a, @RequestParam double b) {
            return a - b;
        }
            
        @GetMapping("/multiplicar")
        public double multiplicar (@RequestParam double a, @RequestParam double b) {
            return a * b;    
        }
            
        @GetMapping("/dividir")
        public double dividir (@RequestParam double a, @RequestParam double b) {
            return a / b;    
            
        }
        
        
    }

    //acessar:http://localhost:8080/somar?a=5&b=3
    //acessar:http://localhost:8080/subtrair?a=5&b=3
    //acessar:http://localhost:8080/multiplicar?a=5&b=3
    //acessar:http://localhost:8080/dividir?a=5&b=