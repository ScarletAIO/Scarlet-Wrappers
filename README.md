# ScarletAI.JS
 The official Node.JS wrapper to <a href="github.com/ScarletAIO/API" target="_blank">ScarletAI.API</a>
## Functions

<dl>
<dt><a href="#createUser">createUser(user)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Send a POST Request to create a new user</p>
</dd>
<dt><a href="#getUser">getUser(id)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Get the user by ID</p>
</dd>
<dt><a href="#updateUser">updateUser(id, user)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Send a PUT Request to update a user</p>
</dd>
<dt><a href="#deleteUser">deleteUser(id, password)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Send a DELETE Request to delete a user</p>
</dd>
<dt><a href="#getRefreshToken">getRefreshToken()</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Send a request to retrieve a new token</p>
</dd>
</dl>

<a name="createUser"></a>

## createUser(user) ⇒ <code>Promise.&lt;object&gt;</code>
Send a POST Request to create a new user

**Kind**: global function

| Param | Type |
| --- | --- |
| user | <code>object</code> |

<a name="getUser"></a>

## getUser(id) ⇒ <code>Promise.&lt;any&gt;</code>
Get the user by ID

**Kind**: global function

| Param | Type |
| --- | --- |
| id | <code>string</code> |

<a name="updateUser"></a>

## updateUser(id, user) ⇒ <code>Promise.&lt;object&gt;</code>
Send a PUT Request to update a user

**Kind**: global function

| Param | Type |
| --- | --- |
| id | <code>string</code> |
| user | <code>object</code> |

<a name="deleteUser"></a>

## deleteUser(id, password) ⇒ <code>Promise.&lt;any&gt;</code>
Send a DELETE Request to delete a user

**Kind**: global function

| Param | Type |
| --- | --- |
| id | <code>string</code> |
| password | <code>string</code> |

<a name="getRefreshToken"></a>

## getRefreshToken() ⇒ <code>Promise.&lt;any&gt;</code>
Send a request to retrieve a new token

**Kind**: global function