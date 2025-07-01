# Deploying Bepo Chat Frontend to Netlify

This guide will help you deploy the Bepo Chat frontend to Netlify and connect it to your backend running on Render.

## Prerequisites

1. Your backend is deployed on Render and working properly
2. You have a Netlify account
3. You have Node.js installed locally

## Deployment Steps

### Option 1: Deploy from the Netlify Dashboard

1. **Prepare your environment variables**:
   - Run the deployment script with your Render backend URL:
   ```bash
   node deploy-to-netlify.js https://your-render-app-url.onrender.com
   ```
   - This will create a `.env.production` file with the correct environment variables

2. **Build your application locally**:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the `dist` folder to the Netlify dashboard
   - Wait for deployment to complete
   - Configure your custom domain if needed

### Option 2: Deploy with Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Prepare your environment variables**:
   ```bash
   node deploy-to-netlify.js https://your-render-app-url.onrender.com
   ```

4. **Deploy your site**:
   ```bash
   netlify deploy --prod
   ```

### Option 3: Connect to GitHub Repository

1. **Push your code to GitHub**

2. **Connect Netlify to your GitHub repository**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Set environment variables in Netlify**:
   - Go to Site settings > Build & deploy > Environment variables
   - Add the following variables:
     - `VITE_API_BASE_URL`: `https://your-render-app-url.onrender.com`
     - `VITE_WS_ENDPOINT`: `https://your-render-app-url.onrender.com/ws`

## Troubleshooting

### CORS Issues

If you encounter CORS issues, ensure your backend on Render has the following CORS configuration:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://your-netlify-app.netlify.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### WebSocket Connection Issues

- Make sure your Render instance supports WebSocket connections
- Check that your environment variables are set correctly
- Check browser console for any connection errors

## Testing Your Deployment

1. Visit your Netlify app URL
2. Register/login to the chat application
3. Try creating a new chat room
4. Send and receive messages in real-time

If you encounter any issues, check the browser console for error messages and ensure your backend is running correctly on Render.

# Connecting Bepo Chat Frontend to Backend

Your frontend is successfully deployed at: https://bepo-chat-verse.netlify.app

## Connecting to Your Render Backend

To connect your Netlify frontend to your Render backend, follow these steps:

### 1. Update Environment Variables in Netlify

You need to set environment variables in your Netlify dashboard:

1. Go to the [Netlify dashboard](https://app.netlify.com/)
2. Select your site (bepo-chat-verse)
3. Go to Site settings > Build & deploy > Environment variables
4. Add the following variables:
   - `VITE_API_BASE_URL`: `https://chat-application-teoj.onrender.com`
   - `VITE_WS_ENDPOINT`: `https://chat-application-teoj.onrender.com/ws`
5. Trigger a new deployment after setting these variables

### 2. Using the Netlify CLI (Alternative Method)

If you prefer using the command line:

1. Install Netlify CLI if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to your Netlify account:
   ```bash
   netlify login
   ```

3. Set the environment variables:
   ```bash
   netlify env:set VITE_API_BASE_URL https://chat-application-teoj.onrender.com
   netlify env:set VITE_WS_ENDPOINT https://chat-application-teoj.onrender.com/ws
   ```

4. Trigger a new deployment:
   ```bash
   netlify deploy --prod
   ```

### 3. Update the Backend CORS Configuration

Your backend CORS configuration has been updated to allow requests from your Netlify site:
```java
registry.addMapping("/**")
        .allowedOrigins(
            "http://localhost:5173",   // Local development
            "https://bepo-chat-verse.netlify.app"  // Deployed Netlify frontend
        )
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
```

Make sure to deploy the updated backend to Render with this CORS configuration.

## Troubleshooting

### WebSocket Connection Issues

- Check browser console for any connection errors
- Verify that your Render backend supports WebSocket connections
- Make sure your environment variables are correctly set in Netlify

### API Connection Issues

- Check that the `VITE_API_BASE_URL` points to your actual Render backend URL
- Ensure your Render backend is running and accessible
- Verify that CORS is properly configured on your backend

## Testing Your Deployment

1. Visit https://bepo-chat-verse.netlify.app
2. Register/login to the chat application
3. Try creating a new chat room
4. Send and receive messages in real-time

If you encounter any issues, check the browser console for error messages and ensure your backend is running correctly on Render. 