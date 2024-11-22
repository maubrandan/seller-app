// src/app/core/models/register-response.interface.ts
export interface RegisterResponse {
    message: string;
    userId?: string; // Agrega propiedades adicionales según la respuesta de tu API
    success?: boolean;
  }
  