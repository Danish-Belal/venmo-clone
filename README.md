<h1>Venmo-clone (Payment Gateway, Monorepo Demonstration nextJs and Prisma)</h1>
<p>This repository demonstrates a monorepo architecture with a new tech stack. As a monorepo, our root directory contains the following:</p>
<ul>
    <li><strong>apps folder</strong>: Contains our applications.</li>
    <li><strong>packages folder</strong>: Contains shareable UI components.</li>
</ul>
<p>The UI components in the <code>packages</code> folder can be utilized across different applications. For more details on export and import in monorepos, please refer to the official documentation <a href="<provide link>">here</a>.</p>

<h2>Applications</h2>
<p>We have two applications in our <code>apps</code> folder:</p>
<ol>
    <li><strong>bank-webhook</strong> (Next.js project): This webhook application is used to initiate transactions on the bank server and store the acknowledgment for each transaction.</li>
    <li><strong>user-app</strong> (Next.js project): Manages the entire user interface and functionality, including the dashboard, transactions, transfers, and P2P transfers.</li>
</ol>

<h2>Packages</h2>
<p>The <code>packages</code> folder handles UI components and database configurations:</p>
<ul>
    <li><strong>UI</strong>: Contains static UI components that can be shared between different applications. All UI components need to be exported from the <code>package.json</code> file.</li>
    <li><strong>DB</strong>: Utilizes Prisma for schema management and NeonDB for data storage. It includes all necessary schemas and SQL configurations.</li>
</ul>

<h2>Setup</h2>
<p>To set up the project, follow these steps:</p>
<ol>
    <li>Pull the Docker image:
        <pre><code>docker pull danish19092001/venmo-clone:latest</code></pre>
    </li>
    <li>Configure the database:
        <ul>
            <li>Create a <code>.env</code> file in the <code>db</code> folder.</li>
            <li>Add your NeonDB URL to the <code>DATABASE_URL</code> variable in the <code>.env</code> file.</li>
        </ul>
    </li>
    <li>Migrate the schemas:
        <pre><code>npx prisma migrate</code></pre>
    </li>
    <li>Run the project:
        <pre><code>yarn run dev</code></pre>
    </li>
</ol>

<h2>Issues</h2>
<p>If you encounter any issues, please email: <a href="mailto:danishexplore019@gmail.com">danishexplore019@gmail.com</a></p>
