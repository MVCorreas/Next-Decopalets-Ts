// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import dbConnect from './dbConnect';
// import UserModel from './models/UserModel';
// import NextAuth from 'next-auth';

// // Define the NextAuth configuration
// export const nextAuthConfig = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {
//           type: 'email',
//         },
//         password: { type: 'password' },
//       },
//       async authorize(credentials) {
//         await dbConnect();
//         if (credentials == null) return null;

//         const user = await UserModel.findOne({ email: credentials.email });

//         if (user) {
//           const isMatch = await bcrypt.compare(
//             credentials.password as string,
//             user.password
//           );
//           if (isMatch) {
//             return user;
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/signin',
//     newUser: '/register',
//     error: '/signin',
//   },
//   callbacks: {
//     async jwt({ user, trigger, session, token }: any) {
//       if (user) {
//         token.user = {
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           isAdmin: user.isAdmin,
//         }
//       }
//       if (trigger === 'update' && session) {
//         token.user = {
//           ...token.user,
//           email: session.user.email,
//           name: session.user.name,
//         }
//       }
//       return token
//     },
//     session: async ({ session, token }: any) => {
//       if (token) {
//         session.user = token.user
//       }
//       return session
//     },
//   },
// }

// // Call NextAuth with the configuration and export the handlers
// const nextAuthResult = NextAuth(nextAuthConfig);

// // Ensure that handlers object is correctly defined
// const { handlers = {}, signIn, signOut } = nextAuthResult;

// // Destructure the handlers object
// const { GET, POST } = handlers;

// // Export the handlers and other properties
// export { GET, POST, signIn, signOut };

// // Export auth as a function
// export async function auth() {
//   // Simulate a session with a user and an expiry date
//   const session = {
//     user: {
//       id: '123', // Example user ID
//       name: 'John Doe', // Example user name
//       email: 'john@example.com', // Example user email
//       // Add any other user properties as needed
//     },
//     expires: (Date.now() + 60 * 60 * 1000).toString(), // Set expiry to 1 hour from now
//     // Add any other required session properties
//   };

//   return session;
// }

import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from './models/UserModel'
import NextAuth from 'next-auth'

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        if (credentials == null) return null

        const user = await UserModel.findOne({ email: credentials.email })

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return user
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)