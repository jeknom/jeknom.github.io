---
title: Making My First Open Source Contribution
date: 2025-03-07  

---

## What Led Me to This?

Recently, I made my first open-source contribution to [Pomelo.EntityFrameworkCore.MySql](https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql). This happened during an internal event at work called "Get Stuff Done Days." These are dedicated days where employees can focus on tasks they normally wouldn't have time for—things like tackling technical debt, improving documentation, or experimenting with new tools.

I decided to migrate one of our services to MySQL and AWS serverless database instances. The motivation for switching to MySQL was simple: many of our other services already use it, so standardizing would make maintenance easier. The serverless approach also allows us to scale down our development environments, helping to cut cloud costs.

## The Bug

During the migration, I ran into a problem—some of our tests started failing. These tests relied on precise timestamp comparisons, and it turned out there was an interesting quirk in Pomelo's MySQL provider.

At the time of writing, when using `DateTime.UtcNow` and `DateTime.Now` in queries, Pomelo translates them to MySQL’s `UTC_TIMESTAMP()` and `CURRENT_TIMESTAMP()` functions. However, these functions—when called without arguments—only return timestamps with second-level precision. Additionally, MySQL implicitly converts more precise timestamps to the lower-precision format, but not the other way around. This led to an unexpected issue:

```csharp
public class MyEntity  
{  
    public int Id { get; set; }  
    public DateTime CreatedAt { get; set; }  
}

var entity = new MyEntity { CreatedAt = DateTime.UtcNow };  
dbContext.MyEntities.Add(entity);  
dbContext.SaveChanges();  

var results = dbContext.MyEntities  
    .Where(e => e.CreatedAt < DateTime.UtcNow)  
    .ToList();
```

With this bug, the new entity wouldn't appear in the results, even though `CreatedAt` should be slightly earlier than `DateTime.UtcNow`. The loss of precision in MySQL meant that the comparison didn’t behave as expected. To resolve this issue, you would need to store the UTC timestamp in a variable outside of the query as that will then maintain its precision inside the query. The best thing would be to update Pomelo, so that `DateTime.Now` and `DateTime.UtcNow` get properly translated to `CURRENT_TIMESTAMP(6)` and `UTC_TIMESTAMP(6)`, which I did.

Once I identified the issue, I opened a GitHub issue, submitted a fix, and got my PR merged—officially making me a contributor. 🙌

## Links

- [Check out the PR](https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql/pull/1988)
- [MySQL documentation about date conversions](https://dev.mysql.com/doc/refman/8.4/en/date-and-time-type-conversion.html)